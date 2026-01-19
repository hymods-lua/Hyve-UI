import { HytaleNode } from "@/types/editor";

export const BORDER_COLOR = "#555";
export const HEADER_BG = "#2a2a2a";
export const CONTENT_BG = "#1a1a1a";
export const DECORATION_COLOR = "#eec11a";

export const getHytaleBoxStyles = (node: HytaleNode, isRoot: boolean): React.CSSProperties => {
    const { anchor, properties } = node;
    const padding = properties.padding || { top:0, right:0, bottom:0, left:0 };
    const alignMap = {
        "Left": "flex-start", "Center": "center", "Right": "flex-end",
        "Top": "flex-start", "Middle": "center", "Bottom": "flex-end"
    };

    return {
        // POSICIONAMIENTO
        position: "absolute", 
        transform: `translate(${anchor.left}px, ${anchor.top}px)`,
        width: anchor.width,
        height: anchor.height,
        
        // LAYOUT (Flexbox)
        display: "flex",
        flexDirection: properties.layoutMode === "Left" ? "row" : "column",
        justifyContent: properties.layoutMode === "Left" 
            ? alignMap[properties.contentAlignH || "Center"]
            : alignMap[properties.contentAlignV || "Middle"],
        alignItems: properties.layoutMode === "Left"
            ? alignMap[properties.contentAlignV || "Middle"]
            : alignMap[properties.contentAlignH || "Center"],

         // --- PADDING ---
        paddingTop: `${padding.top}px`,
        paddingBottom: `${padding.bottom}px`,
        paddingLeft: `${padding.left}px`,
        paddingRight: `${padding.right}px`,
        
        // --- ESTÉTICA ---
        backgroundColor: properties.background || "transparent",
        color: properties.color || "#FFF",
        fontSize: properties.fontSize ? `${properties.fontSize}rem` : "1rem", // O px según prefieras
        fontWeight: properties.isBold ? "bold" : "normal",
        textTransform: properties.isUppercase ? "uppercase" : "none",
        
        boxSizing: "border-box",
        overflow: properties.scrollStyle === "Hidden" ? "hidden" : "visible",
    };
};