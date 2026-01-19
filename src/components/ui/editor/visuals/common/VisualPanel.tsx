import { getHytaleBoxStyles } from "../visualUtils";
import { BiSquare } from "react-icons/bi";

export const VisualPanel = ({ node, isRoot, children }: any) => {
    return (
        <div
            id={node.id}
            className="hytale-element"
            style={{
                ...getHytaleBoxStyles(node, isRoot),
                backgroundColor: "#222", 
                border: "2px solid #444",
                borderRadius: "4px",
                backgroundImage: "radial-gradient(#333 10%, transparent 10%)",
                backgroundSize: "10px 10px"
            }}
        >
            {/* Etiqueta identificativa */}
            <div style={{
                position: "absolute",
                top: 0, left: 0,
                background: "#444",
                color: "#ccc",
                fontSize: "9px",
                padding: "1px 4px",
                borderBottomRightRadius: "4px",
                display: "flex", 
                alignItems: "center", 
                gap: 3,
                pointerEvents: "none"
            }}>
                <BiSquare size={10} /> Panel
            </div>

            {children}
        </div>
    );
};