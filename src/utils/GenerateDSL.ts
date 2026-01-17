import { HytaleNode } from "@/hooks/editor/types";

export const generateDSL = (allNodes: HytaleNode[], parentId: string | null = null, indent = "") => {
    let dsl = "";
    const children = allNodes.filter(n => n.parentId === parentId);

    children.forEach(node => {
        // 1. Identificar tipo (Hytale usa @ para prefabs)
        const typeStr = node.type; 
        dsl += `${indent}${typeStr} #${node.id} {\n`;

        const nextIndent = indent + "  ";

        // 2. Exportar Anchor (Solo si tiene valores)
        const a = node.anchor;
        const anchorParts = [];
        if (a.left !== undefined && !node.parentId) anchorParts.push(`Left: ${a.left}`);
        if (a.top !== undefined && !node.parentId) anchorParts.push(`Top: ${a.top}`);
        if (a.width) anchorParts.push(`Width: ${a.width}`);
        if (a.height) anchorParts.push(`Height: ${a.height}`);

        if (anchorParts.length > 0) {
            dsl += `${nextIndent}Anchor: (${anchorParts.join(", ")});\n`;
        }

        const p = node.properties;
        if (p.layoutMode && p.layoutMode !== "None") dsl += `${nextIndent}LayoutMode: ${p.layoutMode};\n`;
        if (p.style) dsl += `${nextIndent}Style: ${p.style};\n`;
        if (p.background) {
            const hytaleColor = formatHytaleColor(p.background);
            dsl += `${nextIndent}Background: ${hytaleColor};\n`;
        }
        // Si tienes propiedades de estilo de texto con color
        if (p.textColor) {
            const hytaleTextColor = formatHytaleColor(p.textColor);
            dsl += `${nextIndent}TextColor: ${hytaleTextColor};\n`;
        }
        if (p.text) dsl += `${nextIndent}Text: "${p.text}";\n`;
        if (p.flexWeight) dsl += `${nextIndent}FlexWeight: ${p.flexWeight};\n`;

        // 4. RECURSIÓN (Meter hijos dentro de las llaves)
        dsl += generateDSL(allNodes, node.id, nextIndent);

        dsl += `${indent}}\n\n`;
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

// Función para descargar el archivo .ui
export const downloadDSL = (elements: HytaleNode[]) => {
    const code = `// Exportado desde Hyve\n$C = "../../Common.ui";\n\n${generateDSL(elements)}`;
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "layout.ui";
    link.click();
};