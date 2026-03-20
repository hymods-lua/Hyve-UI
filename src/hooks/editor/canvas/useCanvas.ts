import { useCallback } from "react";
import { useEditor } from "@/hooks/editor/useEditor";
import { OnDrag, OnResize, OnResizeEnd, OnDragEnd } from "react-moveable";
import { HytaleNode } from "@/types/editor";

export const useCanvasMoveable = (targetEl: HytaleNode | null | undefined) => {
    const { updateElement, elements } = useEditor();
    const parentEl = targetEl ? elements.find(el => el.id === targetEl.parentId) : null;
    const isInLayout = parentEl && parentEl.properties.layoutMode && parentEl.properties.layoutMode !== "None";

    // Actualización visual en tiempo real (directo al DOM para 60fps)
    const handleDrag = useCallback((e: OnDrag) => {
        if (isInLayout) return;
        e.target.style.transform = e.transform;
    }, [isInLayout]);

    const handleResize = useCallback((e: OnResize) => {
        e.target.style.width = `${e.width}px`;
        e.target.style.height = `${e.height}px`;
        e.target.style.transform = e.transform;
    }, []);

    // Actualización del estado global al finalizar la acción
    const handleResizeEnd = useCallback((e: OnResizeEnd) => {
        const { target, lastEvent } = e;
        if (!lastEvent) return;

        const { width, height, drag } = lastEvent;
        const [x, y] = drag.translate;

        const currentEl = elements.find(el => el.id === target.id);
        if (currentEl) {
            updateElement(target.id, {
                anchor: {
                    ...currentEl.anchor,
                    width: Math.round(width),
                    height: Math.round(height),
                    left: x,
                    top: y,
                }
            }, true);
        }
    }, [elements, updateElement]);

    const handleDragEnd = useCallback((e: OnDragEnd) => {
        const { target, isDrag, lastEvent } = e;
        if (!isDrag || !lastEvent) return;

        const [x, y] = lastEvent.translate;

        const currentEl = elements.find(el => el.id === target.id);
        if (currentEl) {
            updateElement(target.id, {
                anchor: {
                    ...currentEl.anchor,
                    left: x,
                    top: y
                }
            }, true);
        }
    }, [elements, updateElement]);

    return {
        handleDrag,
        handleResize,
        handleResizeEnd,
        handleDragEnd,
        isInLayout
    };
};