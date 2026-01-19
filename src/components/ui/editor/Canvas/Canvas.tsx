import React, { useRef, useMemo } from "react";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import style from "./canvas.module.scss";
import { RenderNode } from "../RenderNode/RenderNode";
import { useEditor } from "@/hooks/editor/useEditor";
import { useCanvasMoveable } from "@/hooks/editor/canvas/useCanvas";

const SNAP_GUIDELINES = [0, 100, 200, 400, 600];

export const Canvas: React.FC = () => {
    // Hooks
    const { elements, targets, setTargets, zoom, canvasSize } = useEditor();
    const { handleDrag, handleDragEnd, handleResize, handleResizeEnd } = useCanvasMoveable();
    const canvasRef = useRef<HTMLDivElement>(null);

    // Memos: Cálculos costosos que solo deben correr cuando cambian las dependencias
    const rootElements = useMemo(() => 
        elements.filter(el => el.parentId === null), 
    [elements]);

    const elementGuidelines = useMemo(() => 
        elements.map(el => `#${el.id}`), 
    [elements]);

    return (
        <div className={style.canvas_container}>
            <div 
                ref={canvasRef}
                className={style.canvas_board} 
                id="canvas-board"
                style={{ 
                    width: `${canvasSize.width}px`, 
                    height: `${canvasSize.height}px`, 
                    transform: `scale(${zoom})`,
                    transformOrigin: '0 0'
                }}
            >
                {rootElements.map((el) => (
                    <RenderNode key={el.id} node={el} allNodes={elements} />
                ))}

                <Moveable
                    target={targets}
                    draggable={true}
                    resizable={true}
                    snappable={true}
                    zoom={1 / zoom}
                    keepRatio={false}
                    throttleDrag={1}
                    throttleResize={1}
                    edge={true}
                    snapThreshold={5}
                    elementGuidelines={elementGuidelines}
                    verticalGuidelines={SNAP_GUIDELINES}
                    horizontalGuidelines={SNAP_GUIDELINES}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    onResize={handleResize}
                    onResizeEnd={handleResizeEnd}
                />

                <Selecto
                    dragContainer={"#canvas-board"}
                    selectableTargets={[".hytale-element"]}
                    hitRate={0}
                    selectByClick={true}
                    selectFromInside={false}
                    onSelect={e => setTargets(e.selected)}
                    toggleContinueSelect={["shift"]}
                />
            </div>
        </div>
    );
};