import { HytaleNode } from "@/types/editor";

// Convierte "100%" o 100 en string válido
export const cleanValue = (val: string | number | undefined): string => {
    if (val === undefined || val === null) return "";
    const str = val.toString();
    if (str === "100%") return "";
    return str.replace("px", "");
};

// Si es un prefab (@Name), le anteponemos $C. si asumimos que viene de Common
// O simplemente respetamos el nombre si ya trae el prefijo en el editor.
// Para este ejemplo, si empieza con @, le ponemos $C.
export const formatType = (type: string): string => {
    if (type.startsWith("@")) return `$C.${type}`;
    return type;
};

export const formatHytaleColor = (color: string | undefined): string => {
    if (!color) return "";
    
    // Si ya viene en formato Hytale #000000(0.5), lo dejamos
    if (color.startsWith("#") && color.includes("(")) return color;
    if (color.startsWith("#")) return color;

    // Convertir RGBA: rgba(0, 0, 0, 0.5) -> #000000(0.5)
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/);
    if (match) {
        const [, r, g, b, a] = match;
        const toHex = (n: string) => Number.parseInt(n).toString(16).padStart(2, '0');
        const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        
        if (a && Number.parseFloat(a) < 1) {
            return `${hex}(${a})`;
        }
        return hex;
    }
    return color;
};

// --- GENERADOR PRINCIPAL ---
export const generateDSL = (allNodes: HytaleNode[], parentId: string | null = null, indent = "") => {
    let dsl = "";
    const children = allNodes.filter(n => n.parentId === parentId);

    children.forEach(node => {
        // CABECERA: $C.@DecoratedContainer #DecoratedMain {
        const typeStr = formatType(node.type);
        const namePart = node.name ? ` #${node.name}` : ""; // Regla 7: # para IDs
        
        dsl += `${indent}${typeStr}${namePart} {\n`;
        const nextIndent = indent + "  ";
        const p = node.properties;
        const a = node.anchor;

        // --- 1. ANCHOR (Posicionamiento y Tamaño) ---
        // Regla: Usar (Full: 0) o combinaciones Left/Right/Top/Bottom/Width/Height
        const anchors: string[] = [];

        // Lógica para detectar "Full"
        const isFullWidth = a.width === "100%" || (a.left === 0 && a.right === 0);
        const isFullHeight = a.height === "100%" || (a.top === 0 && a.bottom === 0);

        if (isFullWidth && isFullHeight) {
            // Caso especial: Full total
            anchors.push("Full: 0");
        } else {
            // Caso Horizontal
            if (isFullWidth) {
                // Si es ancho completo, usamos Left:0, Right:0 (o solo Width si layout lo maneja)
                // El snippet del usuario usa "Left: 0, Right: 0" explícito para llenar ancho
                anchors.push("Left: 0", "Right: 0");
            } else {
                if (a.width) anchors.push(`Width: ${cleanValue(a.width)}`);
                if (a.left !== undefined) anchors.push(`Left: ${a.left}`);
                if (a.right !== undefined) anchors.push(`Right: ${a.right}`);
            }

            // Caso Vertical
            if (isFullHeight) {
                anchors.push("Top: 0", "Bottom: 0");
            } else {
                if (a.height) anchors.push(`Height: ${cleanValue(a.height)}`);
                if (a.top !== undefined) anchors.push(`Top: ${a.top}`);
                if (a.bottom !== undefined) anchors.push(`Bottom: ${a.bottom}`);
            }
        }

        if (anchors.length > 0) {
            dsl += `${nextIndent}Anchor: (${anchors.join(", ")});\n`;
        }

        // --- 2. LAYOUT MODE ---
        if (p.layoutMode && p.layoutMode !== "None") {
            // Regla 4: LayoutMode acepta Full, Top, Middle, Left...
            dsl += `${nextIndent}LayoutMode: ${p.layoutMode};\n`;
        }

        if (p.flexWeight) {
            dsl += `${nextIndent}FlexWeight: ${p.flexWeight};\n`;
        }
        
        if (p.scrollStyle && p.scrollStyle !== "Default") {
             dsl += `${nextIndent}ScrollbarStyle: ${p.scrollStyle};\n`;
        }

        // --- 3. PADDING (Regla 6: Full, Top, etc) ---
        if (p.padding) {
            const { top, bottom, left, right } = p.padding;
            const pads: string[] = [];
            
            // Detectar si todos son iguales -> Full
            if (top === bottom && bottom === left && left === right && top !== 0) {
                pads.push(`Full: ${top}`);
            } else {
                if (top) pads.push(`Top: ${top}`);
                if (bottom) pads.push(`Bottom: ${bottom}`);
                if (left) pads.push(`Left: ${left}`);
                if (right) pads.push(`Right: ${right}`);
            }

            if (pads.length > 0) {
                dsl += `${nextIndent}Padding: (${pads.join(", ")});\n`;
            }
        }

        // --- 4. STYLE (Para Textos: Labels) ---
        // Regla 3: HorizontalAlignment dentro de Style
        const styleParts: string[] = [];
        
        if (p.fontSize) styleParts.push(`FontSize: ${p.fontSize}`);
        if (p.color) styleParts.push(`TextColor: ${formatHytaleColor(p.color)}`);
        if (p.isBold) styleParts.push(`RenderBold: true`);
        
        // Alineación de texto
        if (p.textHAlign) styleParts.push(`HorizontalAlignment: ${p.textHAlign}`);
        if (p.textVAlign) styleParts.push(`VerticalAlignment: ${p.textVAlign}`);

        if (styleParts.length > 0) {
            dsl += `${nextIndent}Style: (${styleParts.join(", ")});\n`;
        }

        // --- 5. BACKGROUND ---
        if (p.background) {
            dsl += `${nextIndent}Background: ${formatHytaleColor(p.background)};\n`;
        }

        // --- 6. TEXTO ---
        if (p.text) {
            dsl += `${nextIndent}Text: "${p.text}";\n`;
        }
        
        // --- 7. BINDING / VISIBILIDAD ---
        if (p.visible === false) dsl += `${nextIndent}Visible: false;\n`;

        // --- RECURSIÓN ---
        if (allNodes.some(child => child.parentId === node.id)) {
            dsl += "\n";
            dsl += generateDSL(allNodes, node.id, nextIndent);
        }

        dsl += `${indent}}\n`;
        if (indent === "") dsl += "\n"; 
    });

    return dsl;
};

export const downloadProject = (elements: HytaleNode[]) => {
    const data = JSON.stringify(elements, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `proyecto_ui_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
};

// Función para descargar el archivo .ui
export const downloadDSL = (elements: HytaleNode[]) => {
    const header = `// Exportado desde HyveUI\n$C = "../Common.ui";\n\n`;
    const childrenContent = generateDSL(elements, null, "  ");
    const code = header + childrenContent;
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = "layout.ui";
    link.click();
    URL.revokeObjectURL(url);
};