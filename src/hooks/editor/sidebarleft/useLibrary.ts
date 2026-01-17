import { useState, useCallback } from "react";
import { useEditor } from "@/hooks/editor/useEditor"; // Asumo tu path
import { COMPONENT_REGISTRY } from "@/hooks/editor/registry";

export const useLibrary = () => {
    const { addElement } = useEditor();
    
    // Estado para guardar las categorías colapsadas
    const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());

    const toggleCategory = useCallback((category: string) => {
        setCollapsedCategories((prev) => {
            const next = new Set(prev);
            if (next.has(category)) next.delete(category);
            else next.add(category);
            return next;
        });
    }, []);

    // Helper para obtener la config de un tipo
    const getConfig = (type: string) => COMPONENT_REGISTRY[type];

    return {
        addElement,
        collapsedCategories,
        toggleCategory,
        getConfig
    };
};