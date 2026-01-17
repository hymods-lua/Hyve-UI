import { useEffect } from "react";
import { HytaleNode } from "./types";
import { useEditorContext } from "./useContext";
import { ComponentConfig } from "./libraries/library";

export const useEditor = () => {
    
    const { 
        elements, 
        setElements, 
        undo, 
        redo, 
        canUndo, 
        canRedo, 
        targets, 
        setTargets,
        zoom,
        setZoom,
        clearProject
    } = useEditorContext();


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'z') {
                    e.preventDefault();
                    undo();
                } else if (e.key === 'y' || (e.shiftKey && e.key === 'Z')) {
                    e.preventDefault();
                    redo();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [undo, redo]);

    /**
     * Actualiza propiedades de un elemento.
     * @param saveHistory Se usa 'false' para cambios en tiempo real (drag) 
     * y 'true' para cambios definitivos (onDragEnd o inputs del sidebar).
     */
    const updateElement = (id: string, newProps: Partial<HytaleNode>, saveHistory = false) => {
        const newElements = elements.map((el) => {
            if (el.id === id) {
                return {
                    ...el,
                    ...newProps,
                    anchor: { ...el.anchor, ...(newProps.anchor || {}) },
                    properties: { ...el.properties, ...(newProps.properties || {}) },
                };
            }
            return el;
        });
        setElements(newElements, saveHistory);
    };

    /**
     * Cambia el padre de un elemento (Adopción).
     */
    const changeParent = (childId: string, newParentId: string | null) => {
        const newElements = elements.map(el => 
            el.id === childId ? { ...el, parentId: newParentId } : el
        );
        // Siempre guardamos en historial al cambiar jerarquía
        setElements(newElements, true);
    };

    /**
     * 
     * @param sourceId
     * @param targetId
     * @param position
     * @returns 
     */
    const reorderElement = (sourceId: string, targetId: string, position: 'before' | 'after' | 'inside') => {
        if (sourceId === targetId) return;

        // 1. Encontrar los índices usando la variable 'elements' que ya viene del context
        const sourceIndex = elements.findIndex(el => el.id === sourceId);
        const targetIndex = elements.findIndex(el => el.id === targetId);
        
        if (sourceIndex === -1 || targetIndex === -1) return;

        const sourceEl = elements[sourceIndex];
        const targetEl = elements[targetIndex];

        // 2. Validación de descendencia (para no meter un padre dentro de su hijo)
        const isDescendant = (parent: string, potentialChild: string): boolean => {
            const child = elements.find(el => el.id === potentialChild);
            if (!child || !child.parentId) return false;
            if (child.parentId === parent) return true;
            return isDescendant(parent, child.parentId);
        };

        if (position === 'inside' && isDescendant(sourceId, targetId)) {
            console.warn("No puedes mover un contenedor dentro de sus propios hijos.");
            return;
        }

        // 3. Crear la nueva lista clonando la actual
        let newList = [...elements];
        
        // Extraemos el item movido
        const [movedItem] = newList.splice(sourceIndex, 1);

        // Encontrar la nueva posición del objetivo tras la extracción
        const newTargetIndex = newList.findIndex(el => el.id === targetId);
        
        let finalParentId = movedItem.parentId;
        let finalInsertIndex = newTargetIndex;

        if (position === 'inside') {
            finalParentId = targetId;
            finalInsertIndex = newTargetIndex + 1; // Insertar al inicio de los hijos
        } else {
            finalParentId = targetEl.parentId;
            if (position === 'after') finalInsertIndex = newTargetIndex + 1;
        }

        // 4. Actualizar el item e insertarlo
        const updatedItem: HytaleNode = { ...movedItem, parentId: finalParentId };
        newList.splice(finalInsertIndex, 0, updatedItem);

        // 5. ENVIAR AL CONTEXT (Pasamos la lista completa y true para el historial)
        setElements(newList, true);
        
        // Limpiar selección para evitar errores de Moveable
        setTargets([]);
    };

    /**
     * Renombra un ID y actualiza las referencias de los hijos.
     */
    const renameElement = (oldId: string, newId: string) => {
        if (!newId || elements.find(el => el.id === newId)) return;

        const newElements = elements.map((el) => {
            if (el.id === oldId) return { ...el, id: newId };
            if (el.parentId === oldId) return { ...el, parentId: newId };
            return el;
        });

        setElements(newElements, true);
        setTargets([]); // Limpiar selección para evitar errores de referencia en el DOM
    };

    /**
     * Añade un nuevo elemento al canvas o dentro de un grupo seleccionado.
     */
    const addElement = (config: ComponentConfig) => {
        if (!config?.type) {
            console.error("Error: Intentando añadir un componente sin configuración válida", config);
            return;
        }
        const selectedId = targets.length > 0 ? targets[0].id : null;
        const selectedEl = elements.find(el => el.id === selectedId);
        
        // Solo permitimos anidación automática si el target es un Group
        const newParentId = selectedEl?.type === "Group" || selectedEl?.type.includes("Container") ? selectedId : null;

        const uniqueId = `${config.type.replace(/[@$]/g, "")}${Math.random().toString(36).substr(2, 5)}`;

        const newNode: HytaleNode = {
            id: uniqueId,
            type: config.type,
            parentId: newParentId,
            anchor: {
                ...config.defaultAnchor,
                left: newParentId ? 10 : 150,
                top: newParentId ? 10 : 150,
            },
            properties: {
                ...config.defaultProperties,
                layoutMode: (config.slots?.length && config.slots?.length > 0 ) ? "Top" : "None"
            }
        };

        // Lógica para crear sub-nodos automáticos (Slots)
        const extraNodes: HytaleNode[] = [];
        if (config.slots) {
            config.slots.forEach(slotName => {
                extraNodes.push({
                    id: `${uniqueId}${slotName.replace("#", "")}`,
                    type: "Group",
                    parentId: uniqueId,
                    anchor: { width: "100%", height: 50, left: 0, top: 0 },
                    properties: { layoutMode: "Top" }
                });
            });
        }

        setElements([...elements, newNode, ...extraNodes], true);
    };

    /**
     * Borra un elemento y todos sus descendientes.
     */
    const deleteElement = (id: string) => {
        const toDelete = new Set([id]);
        
        const findChildren = (parentId: string) => {
            elements.forEach(el => {
                if (el.parentId === parentId) {
                    toDelete.add(el.id);
                    findChildren(el.id);
                }
            });
        };
        
        findChildren(id);
        const newElements = elements.filter(el => !toDelete.has(el.id));
        
        setElements(newElements, true);
        setTargets([]);
    };

    return { 
        elements, 
        setElements,
        targets, 
        setTargets, 
        changeParent, 
        updateElement, 
        addElement, 
        deleteElement, 
        renameElement,
        undo,
        redo,
        canUndo,
        canRedo,
        zoom,
        setZoom,
        reorderElement,
        clearProject
    };
};