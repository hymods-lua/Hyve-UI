import React, { useRef } from "react";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import style from "./canvas.module.scss";
import { RenderNode } from "../RenderNode/RenderNode";
import { useEditor } from "@/hooks/editor/useEditor";

export const Canvas: React.FC = () => {
    const { elements, targets, setTargets, updateElement, zoom } = useEditor();
    const canvasRef = useRef<HTMLDivElement>(null);
    const rootElements = elements.filter(el => el.parentId === null);

    return (
    <div className={style.canvas_container}>
        <div 
            ref={canvasRef}
            className={style.canvas_board} 
            id="canvas-board"
            style={{ 
                width: '3000px', 
                height: '3000px', 
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
                throttleDrag={10}
                edge={true}
                elementGuidelines={elements.map(el => `#${el.id}`)}
                verticalGuidelines={[0, 100, 200, 400, 600]}
                horizontalGuidelines={[0, 100, 200, 400, 600]}
                throttleResize={10}
                snapThreshold={5}
                onDrag={e => {
                    e.target.style.transform = e.transform;
                }}
                onResize={e => {
                    e.target.style.width = `${e.width}px`;
                    e.target.style.height = `${e.height}px`;
                    e.target.style.transform = e.transform;
                }}
                onResizeEnd={({ target, lastEvent }) => {
                    if (lastEvent) {
                        const { width, height, drag } = lastEvent;
                        const transform = drag.transform;
                        const match = transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);

                        const currentEl = elements.find(el => el.id === target.id);
                        if (currentEl) {
                            updateElement(target.id, {
                                anchor: {
                                    ...currentEl.anchor,
                                    width: Math.round(width),
                                    height: Math.round(height),
                                    left: match ? Number.parseFloat(match[1]) : currentEl.anchor.left,
                                    top: match ? Number.parseFloat(match[2]) : currentEl.anchor.top,
                                }
                            }, true);
                        }
                    }
                }}
                onDragEnd={({ target, isDrag }) => {
                    if (!isDrag) return;
                    // Extraemos los valores finales del transform que puso Moveable
                    const transform = target.style.transform;
                    const match = transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
                    if (match) {
                        const newX = Number.parseFloat(match[1]);
                        const newY = Number.parseFloat(match[2]);
                        const currentEl = elements.find(el => el.id === target.id);
                        if (currentEl) {
                            updateElement(target.id, {
                                anchor: {
                                    ...elements.find(el => el.id === target.id)?.anchor,
                                    left: newX,
                                    top: newY
                                }
                            }, true);
                        }
                    }
                }}
            />

            <Selecto
                dragContainer={"#canvas-board"}
                selectableTargets={[".hytale-element"]}
                hitRate={0}
                selectByClick={true}
                selectFromInside={false}
                onSelect={e => setTargets(e.selected)}
            />
        </div>
    </div>
    );
};