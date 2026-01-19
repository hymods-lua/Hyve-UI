import { HytaleNode } from "@/types/editor";

// Convierte "100%" o 100 en string válido
const cleanMeasure = (val: string | number | undefined): string => {
    if (val === undefined || val === null) return "";
    return val.toString(); // Hytale suele aceptar "100%" y "100" directos
};

// Convierte referencias @Style a $C.Style (Convención común en Hytale)
// Si no empieza con @, lo deja igual.
const formatReference = (val: string): string => {
    if (!val) return "";
    if (val.startsWith("@")) {
        return `$C.@${val.substring(1)}`; 
    }
    return val;
};

const formatHytaleColor = (color: string | undefined): string => {
    if (!color) return "#ffffff";

    if (color.includes("#") && color.includes("(")) return color;
    const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    
    if (rgbaMatch) {
        const r = Number.parseInt(rgbaMatch[1]).toString(16).padStart(2, '0');
        const g = Number.parseInt(rgbaMatch[2]).toString(16).padStart(2, '0');
        const b = Number.parseInt(rgbaMatch[3]).toString(16).padStart(2, '0');
        const a = rgbaMatch[4] ? rgbaMatch[4] : "1";
        if (Number.parseFloat(a) < 1) {
            return `#${r}${g}${b}(${a})`;
        }
        return `#${r}${g}${b}`;
    }
    return color;
};

// --- GENERADOR PRINCIPAL ---
export const generateDSL = (allNodes: HytaleNode[], parentId: string | null = null, indent = "") => {
    let dsl = "";
    
    // Filtramos los hijos directos del padre actual
    const children = allNodes.filter(n => n.parentId === parentId);

    children.forEach(node => {
        const p = node.properties;
        const a = node.anchor;

        // 1. CABECERA: Type "Name" {
        // Usamos node.name (el ID Code que pusiste en el Sidebar)
        // Si no tiene nombre, solo ponemos el Tipo (común en layouts anidados)
        const typeStr = formatReference(node.type); 
        const namePart = node.name ? ` "${node.name}"` : "";
        dsl += `${indent}${typeStr}${namePart} {\n`;
        const nextIndent = indent + "  ";

        // 2. LOGIC & STATE (Binding, Visible)
        if (p.binding) dsl += `${nextIndent}Binding: "${p.binding}";\n`;
        if (p.macro) dsl += `${nextIndent}Macro: "${p.macro}";\n`;
        if (p.visible === false) dsl += `${nextIndent}Visible: false;\n`;
        if (p.enabled === false) dsl += `${nextIndent}Enabled: false;\n`;

        // 3. ANCHOR (Posición y Tamaño)
        const anchorParts: string[] = [];
        if (a.left !== undefined && a.left !== 0) anchorParts.push(`L: ${a.left}`);
        if (a.top !== undefined && a.top !== 0) anchorParts.push(`T: ${a.top}`);
        if (a.right !== undefined) anchorParts.push(`R: ${a.right}`);
        if (a.bottom !== undefined) anchorParts.push(`B: ${a.bottom}`);
        
        if (a.width && a.width !== "100%") {
            anchorParts.push(`W: ${cleanMeasure(a.width)}`);
        }
        
        if (a.height && a.height !== "100%") {
            anchorParts.push(`H: ${cleanMeasure(a.height)}`);
        }

        if (anchorParts.length > 0) {
            dsl += `${nextIndent}Anchor: ${anchorParts.join(", ")};\n`;
        }

        // 4. LAYOUT & PADDING
        // Mapeo de tus valores internos a los de Hytale
        if (p.layoutMode && p.layoutMode !== "None") {
            const modeMap: Record<string, string> = { "Top": "Vertical", "Left": "Horizontal", "TopScrolling": "Vertical" };
            dsl += `${nextIndent}Layout: ${modeMap[p.layoutMode] || p.layoutMode};\n`;
        }
        
        if (p.scrollStyle && p.scrollStyle !== "Default") {
             dsl += `${nextIndent}Scroll: ${p.scrollStyle};\n`;
        }

        if (p.flexWeight) {
            dsl += `${nextIndent}FlexWeight: ${p.flexWeight};\n`;
        }

        // Padding compactado
        if (p.padding) {
            const padParts = [];
            if (p.padding.left) padParts.push(`L: ${p.padding.left}`);
            if (p.padding.right) padParts.push(`R: ${p.padding.right}`);
            if (p.padding.top) padParts.push(`T: ${p.padding.top}`);
            if (p.padding.bottom) padParts.push(`B: ${p.padding.bottom}`);

            if (padParts.length > 0) {
                dsl += `${nextIndent}Padding: ${padParts.join(", ")};\n`;
            }
        }

        // 5. APARIENCIA & ALINEACIÓN
        if (p.text) dsl += `${nextIndent}Text: "${p.text}";\n`;
        
        // Style Raw (tu nueva propiedad)
        if (p.styleRaw) {
            dsl += `${nextIndent}Style: ${formatReference(p.styleRaw)};\n`;
        }

        if (p.background) {
            dsl += `${nextIndent}Background: ${formatHytaleColor(p.background)};\n`;
        }

        if (p.color) {
            dsl += `${nextIndent}Color: ${formatHytaleColor(p.color)};\n`;
        }

        // Alineación
        if (p.contentAlignH) dsl += `${nextIndent}H-Align: ${p.contentAlignH};\n`;
        if (p.contentAlignV) dsl += `${nextIndent}V-Align: ${p.contentAlignV};\n`;

        // Tipografía Flags
        if (p.isBold) dsl += `${nextIndent}Font: Bold;\n`; // Simplificado, a veces es FontStyle
        if (p.isUppercase) dsl += `${nextIndent}Transform: Upper;\n`;

        // 6. RECURSIÓN (Hijos)
        // Añadimos una línea en blanco antes de los hijos para legibilidad
        if (allNodes.some(child => child.parentId === node.id)) {
            dsl += "\n"; 
            dsl += generateDSL(allNodes, node.id, nextIndent);
        }

        dsl += `${indent}}\n`;
        // Línea en blanco entre elementos hermanos
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
};

// Función para descargar el archivo .ui
export const downloadDSL = (elements: HytaleNode[]) => {
    const header = `// Exportado desde WayhomeUI\n$C = "../Common.ui";\n\n`;
    let finalCode = `Group #MainGroup {\n`;
    finalCode += `  Anchor: (Left: 0, Top: 0);\n`;
    finalCode += `  Background: #ffffff(0.05);\n\n`;

    const childrenContent = generateDSL(elements, null, "  ");
    finalCode += childrenContent;
    finalCode += `}`;
    
    const code = header + finalCode;
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "layout.ui";
    link.click();
};