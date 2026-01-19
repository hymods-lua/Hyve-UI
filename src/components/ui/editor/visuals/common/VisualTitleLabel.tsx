import { getHytaleBoxStyles } from "../visualUtils";
import { BiHeading } from "react-icons/bi";

export const VisualTitleLabel = ({ node, isRoot }: any) => {
    const styles = getHytaleBoxStyles(node, isRoot);

    return (
        <div
            id={node.id}
            className="hytale-element"
            style={{
                ...styles,
                fontSize: styles.fontSize === "1rem" ? "40px" : styles.fontSize, 
                justifyContent: "center", 
                textAlign: "center",
                whiteSpace: "nowrap",
                
                border: "1px dotted #666",
                color: node.properties.color || "#fff",
                textShadow: "2px 2px 0px #000",
                lineHeight: 1,
            }}
        >
            <div style={{
                position: "absolute",
                top: -12, left: 0,
                fontSize: "8px",
                color: "#666",
                display: "flex", alignItems: "center", gap: 2
            }}>
                <BiHeading /> Title
            </div>

            {node.properties.text || "TITLE"}
        </div>
    );
};