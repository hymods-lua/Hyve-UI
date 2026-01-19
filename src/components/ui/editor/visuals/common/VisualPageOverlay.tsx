import { getHytaleBoxStyles } from "../visualUtils";
import { BiLayer } from "react-icons/bi";

export const VisualPageOverlay = ({ node, isRoot, children }: any) => {
    return (
        <div
            id={node.id}
            className="hytale-element"
            style={{
                ...getHytaleBoxStyles(node, isRoot),
                backgroundColor: "rgba(0, 0, 0, 0.45)",
                border: "1px dashed rgba(255, 255, 255, 0.2)",
                width: node.anchor.width || "100%",
                height: node.anchor.height || "100%",
            }}
        >
            <div style={{
                position: "absolute",
                top: 5, left: 5,
                color: "rgba(255,255,255,0.4)",
                fontSize: "10px",
                display: "flex",
                alignItems: "center",
                gap: 4,
                pointerEvents: "none"
            }}>
                <BiLayer /> @PageOverlay (Common)
            </div>

            {children}
        </div>
    );
};