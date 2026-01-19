import { HytaleNode } from "@/types/editor";

export interface ComponentConfig {
    type: string;
    label: string;
    description?: string;
    defaultAnchor: Partial<HytaleNode['anchor']>;
    defaultProperties: Partial<HytaleNode['properties']>; 

    slots?: string[];
}

export const HYTALE_LIBRARY: Record<string, ComponentConfig[]> = {
     "Common": [
        {
            type: "@PageOverlay",
            label: "Page Overlay",
            description: "Fondo oscuro estándar para menús (Common.ui)",
            defaultAnchor: { 
                width: "100%", 
                height: "100%", 
                left: 0, 
                top: 0 
            },
            defaultProperties: {
                layoutMode: "None",
                background: "rgba(0, 0, 0, 0.45)", 
                padding: { top: 0, bottom: 0, left: 0, right: 0 },
                visible: true
            }
        },
        {
            type: "@DecoratedContainer",
            label: "Panel Decorado",
            description: "Contenedor estándar con Título, Cuerpo y Botón X",
            defaultAnchor: { 
                width: 600, 
                height: 500
            },
            defaultProperties: { 
                layoutMode: "None",
                visible: true,
                padding: { top:0, left:0, right:0, bottom:0 }
            },
            slots: ["#Title", "#Content"]
        },
         {
            type: "@Panel",
            label: "Panel Simple",
            description: "Contenedor genérico con fondo (FullPatch)",
            defaultAnchor: { width: 300, height: 300 },
            defaultProperties: { 
                layoutMode: "None", 
                visible: true,
                padding: { top: 20, left: 20, right: 20, bottom: 20 }
            },
        },
        {
            type: "@TitleLabel",
            label: "Título Grande",
            description: "Texto centrado de 40px (Common.ui)",
            defaultAnchor: { 
                width: 400,
                height: 50 
            },
            defaultProperties: { 
                text: "TÍTULO DEL MENÚ",
                layoutMode: "None", 
                visible: true,
                fontSize: 40,
                contentAlignH: "Center",
                contentAlignV: "Middle",
                color: "#FFFFFF"
            }
        },
    ],
    "Contenedores": [
        {
            type: "Group",
            label: "Grupo Libre",
            description: "Contenedor básico absoluto",
            defaultAnchor: { width: 200, height: 200 },
            defaultProperties: { 
                layoutMode: "None", 
                background: "rgba(255,255,255,0.05)",
                visible: true,
                padding: { top:0, left:0, right:0, bottom:0 } 
            }
        },
        
    ],
    "Botones": [
        {
            type: "@TextButton",
            label: "Botón Hytale",
            defaultAnchor: { width: 172, height: 44 },
            defaultProperties: { 
                text: "ACEPTAR", 
                styleRaw: "@DefaultTextButtonStyle",
                color: "#FFFFFF",
                contentAlignH: "Center",
                contentAlignV: "Middle"
            }
        },
        {
            type: "@TextButton", // Reutilizamos tipo, cambiamos preset
            label: "Botón Rojo",
            defaultAnchor: { width: 172, height: 44 },
            defaultProperties: { 
                text: "CANCELAR",
                styleRaw: "@RedButtonStyle",
                color: "#FFCCCC",
                contentAlignH: "Center",
                contentAlignV: "Middle"
            }
        }
    ],
    "Entradas": [
        {
            type: "@TextField",
            label: "Campo Texto",
            defaultAnchor: { width: 250, height: 38 },
            defaultProperties: { 
                text: "", 
                background: "#000000",
                padding: { top:0, left:5, right:5, bottom:0 },
                contentAlignV: "Middle"
            }
        },
        {
            type: "@CheckBoxWithLabel",
            label: "Checkbox",
            defaultAnchor: { width: 200, height: 24 },
            defaultProperties: { 
                text: "Opción", 
                styleRaw: "@DefaultLabelStyle",
                contentAlignH: "Left"
            }
        }
    ]
};