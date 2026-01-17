import { useEditor } from "@/hooks/editor/useEditor";
import { COMPONENT_REGISTRY } from "@/hooks/editor/registry";
import { useCallback, useMemo } from "react";

export const useSidebarRight = () => {
    const { elements, targets, updateElement, renameElement } = useEditor();

    // 1. Obtener elemento seleccionado
    const selectedId = targets.length > 0 ? targets[0].id : null;
    const element = useMemo(() => 
        elements.find((el) => el.id === selectedId), 
    [elements, selectedId]);

    // 2. Obtener config del registro
    const config = useMemo(() => {
        if (!element) return null;
        return COMPONENT_REGISTRY[element.type] || COMPONENT_REGISTRY["Group"];
    }, [element?.type]);

    // 3. Actions (memoizadas para rendimiento)
    const updateAnchor = useCallback((prop: string, val: any) => {
        if (!element) return;
        updateElement(element.id, { anchor: { [prop]: val } });
    }, [element, updateElement]);

    const updateProp = useCallback((prop: string, val: any) => {
        if (!element) return;
        updateElement(element.id, { properties: { [prop]: val } });
    }, [element, updateElement]);

    const handleRename = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && element) {
            const sanitized = e.currentTarget.value.replace(/[^a-zA-Z0-9_-]/g, "");
            renameElement(element.id, sanitized);
            e.currentTarget.blur(); // Quitar foco al terminar
        }
    }, [element, renameElement]);

    return {
        element,
        config,
        actions: {
            updateAnchor,
            updateProp,
            handleRename
        }
    };
};