import { getHytaleBoxStyles } from "./visualUtils";

// 1. EL BOTÓN DORADO DE HYTALE
export const VisualButton = ({ node, isRoot, children }: any) => (
    <div
        id={node.id}
        className="hytale-element"
        style={{
            ...getHytaleBoxStyles(node, isRoot),
            backgroundColor: "#eec11a", // El dorado de Hytale
            color: "#000",
            fontWeight: "bold",
            borderRadius: "4px",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "13px",
            textTransform: "uppercase"
        }}
    >
        {node.properties.text}
        {children}
    </div>
);


// 3. GRUPO GENÉRICO (Para el resto)
export const VisualGroup = ({ node, isRoot, children }: any) => (
    <div
        id={node.id} 
        className="hytale-element" 
        style={{
        ...getHytaleBoxStyles(node, isRoot),
        outline: "1px dashed rgba(238, 193, 26, 0.3)",   
    }}>
        {node.properties.text && <span>{node.properties.text}</span>}
        {children}
    </div>
);