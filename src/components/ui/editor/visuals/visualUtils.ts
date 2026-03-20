import { HytaleNode } from "@/types/editor";
import { CSSProperties } from "react";

export const BORDER_COLOR = "#555";
export const HEADER_BG = "#2a2a2a";
export const CONTENT_BG = "#1a1a1a";
export const DECORATION_COLOR = "#eec11a";

export const getHytaleBoxStyles = (node: HytaleNode, isRoot: boolean): React.CSSProperties => {
    const { anchor, properties } = node;
    const padding = properties.padding || { top:0, right:0, bottom:0, left:0 };
    const isFlexItem = !!properties.flexWeight;
    let display = "flex";
    let flexDirection: "row" | "column" | "row-reverse" | "column-reverse";
    let justifyContent = "flex-start";
    let alignItems = "stretch"; 

    switch (properties.layoutMode) {
        case "Left":
            flexDirection = "row";
            alignItems = "center";
            break;
        case "Right":
            flexDirection = "row-reverse";
            alignItems = "center";
            break;
        case "Middle":
            flexDirection = "column";
            justifyContent = "center";
            break;
        case "Center":
            flexDirection = "column";
            alignItems = "center";
            break;
        case "MiddleCenter":
            flexDirection = "column";
            justifyContent = "center";
            alignItems = "center";
            break;
        case "Bottom":
            flexDirection = "column";
            justifyContent = "flex-end";
            break;
        case "Full":
            flexDirection = "column";
            alignItems = "stretch";
            break;
        case "Top":
        case "TopScrolling":
        default:
            flexDirection = "column";
            break;
    }

    const formatSize = (val: string | number | undefined) => {
        if (val === undefined || val === null || val === "") return "auto";
        
        // Si es un número (ej: 200), le ponemos px
        if (typeof val === "number") return `${val}px`;
        
        // Si ya es string
        const str = val.toString();
        
        // Si ya tiene % o px, lo devolvemos tal cual
        if (str.endsWith("%") || str.endsWith("px") || str === "auto") return str;
        
        // Si es solo texto numérico ("500"), le agregamos px
        if (!isNaN(Number(str))) return `${str}px`;
        
        return str;
    };


    const textAlignMap: Record<string, CSSProperties['textAlign']> = {
        "Left": "left", "Center": "center", "Right": "right"
    };

    const isTextElement = node.type.includes("Label") || node.type.includes("Button");
    if (isTextElement) {
        alignItems = "center";
        
        if (properties.textHAlign) {
            if (properties.textHAlign === "Center") alignItems = "center";
        }
    }

    const styles: CSSProperties = {
        position: isFlexItem ? "relative" : "absolute",
        transform: `translate(${anchor.left ?? 0}px, ${anchor.top ?? 0}px)`,
        
        width: formatSize(anchor.width),
        height: formatSize(anchor.height),

        // Flexbox Props
        display,
        flexDirection,
        justifyContent,
        alignItems,

        // Padding
        paddingTop: `${padding.top}px`,
        paddingBottom: `${padding.bottom}px`,
        paddingLeft: `${padding.left}px`,
        paddingRight: `${padding.right}px`,

        // Apariencia
        backgroundColor: properties.background || "transparent",
        color: properties.color || "#FFF",
        
        // Texto
        fontSize: properties.fontSize ? `${properties.fontSize}px` : "14px",
        fontWeight: properties.isBold ? "bold" : "normal",
        textTransform: properties.isUppercase ? "uppercase" : "none",
        textAlign: properties.textHAlign ? textAlignMap[properties.textHAlign] : "left",
        
        // Misc
        boxSizing: "border-box",
        overflow: properties.scrollStyle === "Hidden" ? "hidden" : "visible",
    };

    // --- REGLAS ESPECIALES "FULL" ---
    if (properties.layoutMode === "Full") {
        styles.width = "100%";
        styles.height = "100%";
        
        // Si NO es un item flexible (o sea, es un overlay absoluto)
        if (!isFlexItem && !isRoot && node.parentId) {
            styles.left = 0;
            styles.top = 0;
            styles.transform = "none"; // Anulamos el drag manual
        }
    }
    
    if (isFlexItem) {
        styles.flex = `${properties.flexWeight} 1 0%`; 
        
        styles.width = "auto";
        styles.height = "auto"; 
        styles.position = "relative";
        styles.transform = "none";
        styles.left = "auto";
        styles.top = "auto";
    }

    return styles;
};