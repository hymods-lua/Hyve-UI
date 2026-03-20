import { IconType } from "react-icons";
import { BiBox, BiCheckSquare, BiHeading, BiLayer, BiListUl, BiPointer, BiSquareRounded, BiText, BiWindow } from "react-icons/bi";
import { MdInput } from "react-icons/md";
import { VisualPageOverlay } from "@/components/ui/editor/visuals/common/VisualPageOverlay";
import { VisualDecoratedContainer } from "@/components/ui/editor/visuals/common/VisualDecoratedContainer";
import { VisualButton, VisualGroup } from "@/components/ui/editor/visuals/visualsHytale";
import { VisualPanel } from "@/components/ui/editor/visuals/common/VisualPanel";
import { VisualTitleLabel } from "@/components/ui/editor/visuals/common/VisualTitleLabel";
import { HytaleNode } from "@/types/editor";

export interface ComponentRegistryEntry {
    type: string;
    label: string;
    icon: IconType;
    visual: React.FC<{ node: HytaleNode; isRoot: boolean; children?: React.ReactNode }>;
    sections: string[];
    slots?: string[];
    defaultAnchor: Partial<HytaleNode['anchor']>;
    defaultProperties: Partial<HytaleNode['properties']>;
}

export const VIEWPORT_PRESETS = [
    { id: 'fhd', label: '1080p (FHD)', width: 1920, height: 1080 },
    { id: 'hd', label: '720p (HD)', width: 1280, height: 720 },
    { id: 'qhd', label: '1440p (2K)', width: 2560, height: 1440 },
    { id: '4k', label: '4K (UHD)', width: 3840, height: 2160 },
    { id: 'steam-deck', label: 'Steam Deck', width: 1280, height: 800 },
];

export const COMPONENT_CATEGORIES = {
    "BASE": ["Group", "Label"],
    "COMMON UI": [
        "@PageOverlay",
        "@DecoratedContainer",
        "@Panel",
        "@TitleLabel"
    ],
    "INTERACTIVOS": ["@TextButton", "@CheckBoxWithLabel", "@TextField"]
};

export const COMPONENT_REGISTRY: Record<string, ComponentRegistryEntry> = {
    "Group": {
        type: "Group",
        label: "Grupo",
        icon: BiBox,
        visual: VisualGroup,
        sections: ["Transform", "Layout", "Appearance"],
        defaultAnchor: { width: 1250, height: 750 },
        defaultProperties: { layoutMode: "None", background: "rgba(255,255,255,0.05)" }
    },
    "@PageOverlay": {
        type: "@PageOverlay",
        label: "Overlay",
        icon: BiLayer,
        visual: VisualPageOverlay,
        sections: ["Layout", "Content", "Appearance"], 
        defaultAnchor: { width: "100%", height: "100%" },
        defaultProperties: { }
    },
    "@Panel": {
        type: "@Panel",
        label: "Panel",
        icon: BiSquareRounded,
        visual: VisualPanel,
        sections: ["Transform", "Layout", "Padding", "Logic"],
        defaultAnchor: { width: 300, height: 300 },
        defaultProperties: {}
    },
    "@DecoratedContainer": {
        type: "@DecoratedContainer",
        label: "Panel Decorado",
        icon: BiWindow,
        visual: VisualDecoratedContainer,
        sections: ["Transform", "Layout"],
        slots: ["#Title", "#Content"],
        defaultAnchor: { width: 950, height: 450 },
        defaultProperties: { layoutMode: "Top" }
    },
    "@TitleLabel": {
        type: "@TitleLabel",
        label: "Título",
        icon: BiHeading,
        visual: VisualTitleLabel,
        sections: ["Transform", "Content", "Appearance", "Logic"],
        defaultAnchor: { width: 400, height: 50 },
        defaultProperties: {}
    },
    "Label": {
        type: "Label",
        label: "Etiqueta",
        icon: BiText,
        visual: VisualGroup,
        sections: ["Transform", "Content", "Appearance"],
        defaultAnchor: { width: 150, height: 30 },
        defaultProperties: { text: "Nueva Etiqueta", styleRaw: "@DefaultLabelStyle" }
    },
    "@TextButton": {
        type: "@TextButton",
        label: "Botón Hytale",
        icon: BiPointer,
        visual: VisualButton,
        sections: ["Transform", "Content", "Appearance"],
        defaultAnchor: { width: 172, height: 44 },
        defaultProperties: { text: "ACEPTAR", styleRaw: "@DefaultTextButtonStyle" }
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
        defaultAnchor: { width: 200, height: 40 },
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