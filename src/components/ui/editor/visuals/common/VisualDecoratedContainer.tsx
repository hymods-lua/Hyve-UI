import { DECORATION_COLOR, BORDER_COLOR, CONTENT_BG, HEADER_BG, getHytaleBoxStyles } from "../visualUtils";
import { BiX, BiWindow } from "react-icons/bi";

export const VisualDecoratedContainer = ({ node, isRoot, children }: any) => {
    return (
        <div
            id={node.id}
            className="hytale-element"
            style={{
                ...getHytaleBoxStyles(node, isRoot),
                display: "flex",
                flexDirection: "column",
                background: "transparent",
                border: "none",
                overflow: "visible" 
            }}
        >
            {/* --- 1. SIMULACIÓN DECORACIÓN SUPERIOR (Top Decoration) --- */}
            <div style={{
                position: "absolute",
                top: -8, 
                left: "50%", 
                transform: "translateX(-50%)",
                width: "200px", 
                height: "8px",
                background: DECORATION_COLOR,
                opacity: 0.3,
                borderTopLeftRadius: "100%",
                borderTopRightRadius: "100%",
                pointerEvents: "none"
            }} title="ContainerDecorationTop" />

            <div style={{
                height: "50px",
                width: "100%",
                backgroundColor: HEADER_BG,
                border: `1px solid ${BORDER_COLOR}`,
                borderBottom: "none",
                position: "relative",
                display: "flex",
                alignItems: "center",
                paddingLeft: "15px"
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#888', fontSize: '10px' }}>
                    <BiWindow /> @DecoratedContainer
                </div>

                <div style={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#333",
                    border: "1px solid #eec11a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    cursor: "not-allowed",
                    zIndex: 10
                }} title="CloseButton (Auto)">
                    <BiX size={24} />
                </div>
            </div>

            <div style={{
                flex: 1,
                backgroundColor: CONTENT_BG,
                border: `1px solid ${BORDER_COLOR}`,
                borderTop: `1px dashed ${BORDER_COLOR}`,
                position: "relative",
                backgroundImage: "linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)",
                backgroundSize: "20px 20px"
            }}>
                <div style={{
                    position: "absolute",
                    bottom: -6,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "200px",
                    height: "6px",
                    background: DECORATION_COLOR,
                    opacity: 0.3,
                    borderBottomLeftRadius: "100%",
                    borderBottomRightRadius: "100%",
                    pointerEvents: "none"
                }} title="ContainerDecorationBottom" />
            </div>
            {children}
        </div>
    );
};