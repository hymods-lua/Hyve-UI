import { HytaleNode } from "@/types/editor";
import { ComponentConfig } from "./libraries/library";

/**
 * Genera los nodos hijos automáticos (Slots) basados en la configuración del componente.
 */
export const generateSlots = (
    parentId: string, 
    config: ComponentConfig
): HytaleNode[] => {
    if (!config.slots || config.slots.length === 0) return [];

    const nodes: HytaleNode[] = [];
    if (config.type === "@DecoratedContainer") {
        return createDecoratedContainerSlots(parentId, config.slots);
    }
    config.slots.forEach(slotName => {
        nodes.push(createGenericSlot(parentId, slotName));
    });

    return nodes;
};

// --- ESTRATEGIAS ESPECÍFICAS ---

const createDecoratedContainerSlots = (parentId: string, slots: string[]): HytaleNode[] => {
    const nodes: HytaleNode[] = [];
    slots.forEach(slotName => {
        if (slotName.includes("Title")) {
            nodes.push({
                id: `${parentId}_Title`,
                name: "Title",
                type: "Group",
                parentId: parentId,
                anchor: { 
                    top: 0, left: 0, right: 0, 
                    width: "100%", 
                    height: 50
                },
                properties: {
                    visible: true,
                    enabled: true,
                    layoutMode: "Left",
                    padding: { top: 12, left: 15, right: 15, bottom: 0 },
                    background: "rgba(255, 255, 255, 0.05)"
                }
            });
        }
        // 2. Slot #Content
        else if (slotName.includes("Content")) {
            nodes.push({
                id: `${parentId}_Content`,
                name: "Content",
                type: "Group",
                parentId: parentId,
                anchor: { 
                    top: 50,
                    left: 0, right: 0, bottom: 0,
                    width: "100%", 
                    height: "auto" 
                },
                properties: {
                    visible: true,
                    enabled: true,
                    layoutMode: "Top",
                    padding: { top: 17, left: 17, right: 17, bottom: 17 },
                    flexWeight: 1,
                    background: "transparent"
                }
            });
        }
    });

    return nodes;
};

// --- ESTRATEGIA GENÉRICA ---

const createGenericSlot = (parentId: string, slotName: string): HytaleNode => {
    const isHeader = slotName.toLowerCase().includes("header") || slotName.toLowerCase().includes("title");
    
    return {
        id: `${parentId}${slotName.replace("#", "_")}`,
        name: slotName,
        type: "Group",
        parentId: parentId,
        anchor: { 
            width: "100%", 
            height: isHeader ? 40 : "100%", 
            top: 0, left: 0 
        },
        properties: {
            visible: true,
            enabled: true,
            layoutMode: isHeader ? "Left" : "Top",
            padding: { top: 5, bottom: 5, left: 5, right: 5 },
            background: isHeader ? "rgba(255,255,255,0.1)" : "transparent",
            flexWeight: isHeader ? 0 : 1
        }
    };
};