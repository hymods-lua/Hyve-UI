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


// 2. EL CONTENEDOR DECORADO
export const VisualDecoratedContainer = ({ node, isRoot, children }: any) => (
    <div
        id={node.id} 
        className="hytale-element"
        style={{
        ...getHytaleBoxStyles(node, isRoot),
        background: "linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)",
        border: "2px solid #333",
        borderRadius: "8px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
    }}>
        {/* Simulación de la decoración dorada de Hytale */}
        <div style={{ height: '4px', background: '#eec11a', width: '40%', margin: '0 auto' }} />
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