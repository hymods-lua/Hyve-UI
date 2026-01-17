// src/hooks/editor/library.ts

export interface ComponentConfig {
    type: string;
    label: string;
    defaultAnchor: {
        width: number | string;
        height: number | string;
    };
    defaultProperties: {
        text?: string;
        style?: string;
        checked?: boolean;
        layoutMode?: string;
        background?: string;
    };
    fields?:  string[];
    slots?: string[]; // IDs de sub-grupos automáticos como #Title o #Content
}

export const HYTALE_LIBRARY: Record<string, ComponentConfig[]> = {
    "Contenedores": [
        {
            type: "Group",
            label: "Grupo Libre",
            defaultAnchor: { width: 200, height: 200 },
            defaultProperties: { layoutMode: "None", background: "rgba(255,255,255,0.05)" }
        },
        {
            type: "@DecoratedContainer",
            label: "Panel Decorado",
            defaultAnchor: { width: 500, height: 400 },
            defaultProperties: { layoutMode: "Top" },
            slots: ["#Title", "#Content"] // Hytale espera estos IDs dentro
        }
    ],
    "Botones": [
        {
            type: "@TextButton",
            label: "Botón Hytale",
            defaultAnchor: { width: 172, height: 44 },
            defaultProperties: { text: "ACEPTAR", style: "@DefaultTextButtonStyle" }
        },
        {
            type: "@CancelTextButton",
            label: "Botón Cancelar",
            defaultAnchor: { width: 172, height: 44 },
            defaultProperties: { text: "CANCELAR" }
        }
    ],
    "Entradas": [
        {
            type: "@TextField",
            label: "Campo Texto",
            defaultAnchor: { width: 250, height: 38 },
            fields: ["text", "checked", "style"], 
            defaultProperties: { text: "Texto" }
        },
        {
            type: "@CheckBoxWithLabel",
            label: "Checkbox",
            defaultAnchor: { width: 200, height: 22 },
            defaultProperties: { text: "Opción", checked: false, style: "@DefaultLabelStyle" }
        }
    ]
};