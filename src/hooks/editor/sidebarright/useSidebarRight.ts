// hooks/editor/sidebarright/useSidebarRight.ts
import { useEditor } from "@/hooks/editor/useEditor";
import { COMPONENT_REGISTRY } from "@/hooks/editor/libraries/registry"; // Ajusta la ruta a tu registry real
import { useCallback, useMemo } from "react";
import { HytaleNode } from "@/types/editor";

export const useSidebarRight = () => {
    const { elements, targets, updateElement, renameElement } = useEditor();

    // 1. Obtener elemento seleccionado
    const selectedId = targets.length > 0 ? targets[0].id : null;
    
    const element = useMemo(() => 
        elements.find((el) => el.id === selectedId), 
    [elements, selectedId]);

    // 2. Obtener config del registro visual
    const config = useMemo(() => {
        if (!element) return null;
        // Si el tipo exacto existe, úsalo, si no, fallback a "Group"
        return COMPONENT_REGISTRY[element.type] || COMPONENT_REGISTRY["Group"];
    }, [element?.type]);

    // 3. ACTIONS
    
    /**
     * Actualiza propiedades del Anchor (Posición/Tamaño).
     * Soporta dos modos:
     * - Clave/Valor: updateAnchor("width", 100)
     * - Objeto Múltiple: updateAnchor({ left: 0, width: "100%" }) -> Para los botones "Fill"
     */
    const updateAnchor = useCallback((keyOrObj: string | Partial<HytaleNode['anchor']>, value?: any) => {
        if (!element) return;

        let changes: Partial<HytaleNode['anchor']> = {};

        if (typeof keyOrObj === 'string') {
            changes = { [keyOrObj]: value };
        } else {
            changes = keyOrObj;
        }

        updateElement(element.id, { anchor: changes }, true);
    }, [element, updateElement]);

    /** 
     * Update name
    */
    const updateName = useCallback((val: string) => {
        if (!element) return;
        // Pasamos { name: val } directamente, NO dentro de properties
        updateElement(element.id, { name: val }, true);
    }, [element, updateElement]);

    /**
     * Actualiza propiedades generales (properties).
     * Ejemplo: updateProp("text", "Hola") o updateProp("padding", {top:10...})
     */
    const updateProp = useCallback((prop: string, val: any) => {
        if (!element) return;
        updateElement(element.id, { properties: { [prop]: val } }, true);
    }, [element, updateElement]);


    /**
     * Renombra el ID del elemento.
     * Funciona con 'Enter' o al hacer click fuera (blur).
     */
    const handleRename = useCallback((
        e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>
    ) => {
        if (!element) return;

        const target = e.currentTarget;
        const isEnter = (e as React.KeyboardEvent).key === 'Enter';
        const isBlur = e.type === 'blur';

        if (isEnter || isBlur) {
            const rawValue = target.value;
            // Validar caracteres permitidos para IDs de Hytale (letras, numeros, guion bajo)
            const sanitized = rawValue.replace(/[^a-zA-Z0-9_@]/g, "");
            
            if (sanitized && sanitized !== element.id) {
                renameElement(element.id, sanitized);
            } else {
                target.value = element.id; 
            }

            if (isEnter) target.blur();
        }
    }, [element, renameElement]);

    return {
        element,
        config,
        actions: {
            updateAnchor,
            updateProp,
            handleRename,
            updateName
        }
    };
};