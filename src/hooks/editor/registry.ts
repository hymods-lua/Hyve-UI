import { BiBox, BiCheckSquare, BiListUl, BiPointer, BiText, BiWindow } from "react-icons/bi";
import { VisualButton, VisualDecoratedContainer, VisualGroup } from "./visuals/visualsHytale";
import { MdInput } from "react-icons/md";

export const COMPONENT_CATEGORIES = {
    "BASE": ["Group", "Label"],
    "CONTENEDORES": ["@DecoratedContainer", "@Container", "@IndexList"],
    "INTERACTIVOS": ["@TextButton", "@CheckBoxWithLabel", "@TextField"]
};

export const COMPONENT_REGISTRY: Record<string, any> = {
    "Group": {
        type: "Group",
        label: "Grupo",
        icon: BiBox,
        visual: VisualGroup,
        sections: ["Transform", "Layout", "Appearance"],
        defaultAnchor: { width: 200, height: 200 },
        defaultProperties: { layoutMode: "None", background: "rgba(255,255,255,0.05)" }
    },
    "Label": {
        type: "Label",
        label: "Etiqueta",
        icon: BiText,
        visual: VisualGroup, // Puedes usar el mismo de Group por ahora
        sections: ["Transform", "Content", "Appearance"],
        defaultAnchor: { width: 150, height: 30 },
        defaultProperties: { text: "Nueva Etiqueta", style: "@DefaultLabelStyle" }
    },
    "@TextButton": {
        type: "@TextButton",
        label: "Botón Hytale",
        icon: BiPointer,
        visual: VisualButton,
        sections: ["Transform", "Content", "Appearance"],
        defaultAnchor: { width: 172, height: 44 },
        defaultProperties: { text: "ACEPTAR", style: "@DefaultTextButtonStyle" }
    },
    "@DecoratedContainer": {
        type: "@DecoratedContainer",
        label: "Panel Decorado",
        icon: BiWindow,
        visual: VisualDecoratedContainer,
        sections: ["Transform", "Layout"],
        slots: ["#Title", "#Content"],
        defaultAnchor: { width: 500, height: 400 },
        defaultProperties: { layoutMode: "Top" }
    },
    "@IndexList": {
        type: "Group",
        label: "Lista Scroll",
        icon: BiListUl,
        visual: VisualGroup,
        sections: ["Transform", "Layout"],
        defaultAnchor: { width: "100%", height: 300 },
        defaultProperties: { layoutMode: "TopScrolling" }
    },
    "@CheckBoxWithLabel": {
        type: "@CheckBoxWithLabel",
        label: "Check",
        icon: BiCheckSquare,
        visual: VisualGroup,
        sections: ["Transform", "Content"],
        defaultAnchor: { width: 200, height: 22 },
        defaultProperties: { text: "Opción", layoutMode: "Left" }
    },
    "@TextField": {
        type: "@TextField",
        label: "Input",
        icon: MdInput,
        visual: VisualGroup,
        sections: ["Transform", "Content"],
        defaultAnchor: { width: 250, height: 38 },
        defaultProperties: { text: "" }
    }
};