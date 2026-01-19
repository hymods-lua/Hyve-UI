import { HytaleNode } from "@/types/editor";
import { useEditorContext } from "./useContext";
import { ComponentConfig } from "./libraries/library";
import { generateSlots } from "./useSlotFactory";

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
        clearProject,
        setCanvasSize,
        canvasSize
    } = useEditorContext();

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
                    anchor: { ...el.anchor, ...(newProps.anchor) },
                    properties: { ...el.properties, ...(newProps.properties) },
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

        // 2. Validación de descendencia (para no meter un padre dentro de su hijo)
        const isDescendant = (parent: string, potentialChild: string): boolean => {
            const child = elements.find(el => el.id === potentialChild);
            if (!child?.parentId) return false;
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
            finalInsertIndex = newTargetIndex + 1;
        } else if (position === 'after') finalInsertIndex = newTargetIndex + 1;

        const updatedItem: HytaleNode = { ...movedItem, parentId: finalParentId };
        newList.splice(finalInsertIndex, 0, updatedItem);
        setElements(newList, true);
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
        setTargets([]);
    };

    /**
     * Añade un nuevo elemento al canvas o dentro de un grupo seleccionado.
     */
    const addElement = (config: ComponentConfig) => {
        if (!config?.type) {
            console.error("Configuración inválida", config);
            return;
        }

        // 1. Determinar Padre
        const selectedId = targets.length > 0 ? targets[0].id : null;
        const selectedEl = elements.find(el => el.id === selectedId);
        
        // Regla: Solo anidar si el seleccionado es un Grupo o Contenedor
        // Si seleccionas un Botón, el nuevo elemento será su HERMANO, no su hijo.
        let newParentId: string | null = null;
        if (selectedEl) {
            const isContainer = selectedEl.type === "Group" || selectedEl.type.startsWith("@Decorated");
            newParentId = isContainer ? selectedId : selectedEl.parentId;
        }

        // 2. Generar ID Único
        const uniqueId = `${config.type.replace(/[@$]/g, "")}_${Math.random().toString(36).substr(2, 5)}`;

        // 3. Calcular Posición Inicial
        // Si el padre es una lista vertical (Top), la posición absoluta no importa (debe ser 0)
        // Si es canvas libre (None), lo desplazamos un poco para que se vea
        const parentLayout = elements.find(el => el.id === newParentId)?.properties.layoutMode;
        const isFlowLayout = parentLayout === "Top" || parentLayout === "Left";

        const initialLeft = newParentId && !isFlowLayout ? 20 : 0;
        const initialTop = newParentId && !isFlowLayout ? 20 : 0;

        // 4. Preparar Propiedades (Merge de defaults)
        const baseProperties: HytaleNode['properties'] = {
            visible: true,
            enabled: true,
            padding: { top: 0, bottom: 0, left: 0, right: 0 },
            layoutMode: "None",
            ...config.defaultProperties
        };

        const newNode: HytaleNode = {
            id: uniqueId,
            type: config.type,
            parentId: newParentId,
            anchor: {
                ...config.defaultAnchor,
                left: initialLeft,
                top: initialTop,
            },
            properties: baseProperties
        };

        // 5. Generar Sub-Elementos Automáticos (Slots)
        const extraNodes = generateSlots(uniqueId, config);
        // 6. Guardar
        setElements([...elements, newNode, ...extraNodes], true);
    };


    const duplicateElement = (id: string) => {
        const itemToClone = elements.find(el => el.id === id);
        if (!itemToClone) return;

        // Mapa para rastrear viejos IDs -> nuevos IDs (para mantener jerarquía)
        const idMap: Record<string, string> = {};

        // 1. Encontrar todos los descendientes (si es un grupo) y el elemento mismo
        const itemsToClone: HytaleNode[] = [];
        const stack = [itemToClone];

        while (stack.length > 0) {
            const current = stack.pop()!;
            // Generar nuevo ID
            const newId = `${current.type.replace(/[@$]/g, "")}_copy_${Math.random().toString(36).substr(2, 5)}`;
            idMap[current.id] = newId;
            itemsToClone.push({ ...current, id: newId });

            // Buscar hijos
            const children = elements.filter(el => el.parentId === current.id);
            stack.push(...children);
        }

        // 2. Ajustar referencias (parentIds) y posiciones
        const newNodes = itemsToClone.map(node => {
            const newParentId = (node.parentId && idMap[node.parentId]) 
                ? idMap[node.parentId] 
                : node.parentId;

            return {
                ...node,
                parentId: newParentId,
                anchor: {
                    ...node.anchor,
                    // Desplazamos solo el padre principal para que se vea la copia (10px abajo/derecha)
                    left: (node.anchor.left || 0) + 20,
                    top: (node.anchor.top || 0) + 20
                },
            };
        });

        // 3. Guardar
        setElements([...elements, ...newNodes], true);
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

    const handleDeleteSelected = () => {
        if (targets.length === 0) return;
        targets.forEach(target => {
            deleteElement(target.id);
        });
        setTargets([]);
    };

    const handleDuplicateSelected = () => {
        if (targets.length === 0) return;
        duplicateElement(targets[0].id);
    };

    const handleDeselect = () => {
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
        duplicateElement,
        handleDeleteSelected, 
        handleDuplicateSelected,
        handleDeselect,
        undo,
        redo,
        canUndo,
        canRedo,
        zoom,
        setZoom,
        reorderElement,
        clearProject,
        canvasSize,
        setCanvasSize
    };
};