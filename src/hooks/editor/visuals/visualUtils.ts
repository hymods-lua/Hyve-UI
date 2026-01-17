import { HytaleNode } from "../types";

export const getHytaleBoxStyles = (node: HytaleNode, isRoot: boolean): React.CSSProperties => {
    return {
        // POSICIONAMIENTO
        position: "absolute", 
        transform: `translate(${node.anchor.left}px, ${node.anchor.top}px)`,
        left: 0,
        top: 0,
        
        // DIMENSIONES
        width: node.anchor.width || "auto",
        height: node.anchor.height || "auto",
        
        // LAYOUT (Flexbox)
        display: "flex",
        flexDirection: node.properties.layoutMode === "Left" ? "row" : "column",
        flex: node.properties.flexWeight ? `${node.properties.flexWeight} 1 auto` : "none",
        
        // APARIENCIA BASE
        backgroundColor: node.properties.background || "transparent",
        boxSizing: "border-box",
        overflow: "hidden",
        color: "white",
    };
};