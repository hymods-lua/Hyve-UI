import { useState, useCallback } from "react";
import { useEditor } from "../useEditor";

export const useLayerTree = () => {
    const { elements, targets, changeParent, setTargets, deleteElement, reorderElement } = useEditor();
    const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());

    // Toggle optimizado con useCallback
    const toggleCollapse = useCallback((id: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setCollapsedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }, []);

    // Helpers para Drag & Drop
    const handleDrop = useCallback((e: React.DragEvent, targetId: string) => {
        e.stopPropagation();
        const draggedId = e.dataTransfer.getData("elementId");
        
        // Si el objetivo es un elemento, lo metemos dentro
        if (draggedId && draggedId !== targetId) {
            changeParent(draggedId, targetId);
        }
    }, [changeParent]);

    const handleDropToRoot = useCallback((e: React.DragEvent) => {
        const draggedId = e.dataTransfer.getData("elementId");
        if (draggedId) {
            changeParent(draggedId, null);
        }
    }, [changeParent]);

    const handleSelect = useCallback((id: string) => {
        const domEl = document.getElementById(id);
        if (domEl) setTargets([domEl]);
    }, [setTargets]);

    const handleReorder = useCallback((sourceId: string, targetId: string, pos: 'before' | 'after' | 'inside') => {
        reorderElement(sourceId, targetId, pos);
    }, [reorderElement]);

    return {
        elements,
        targets,
        deleteElement,
        collapsedIds,
        toggleCollapse,
        handleDrop,
        handleSelect,
        handleReorder,
        handleDropToRoot
    };
};