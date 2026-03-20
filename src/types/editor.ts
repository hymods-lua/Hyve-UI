export type LayoutMode = "None" | "Full" | "MiddleCenter" | "Middle" | "Top" | "Bottom" | "Left" | "Right" | "Center" | "BottomScrolling" | "TopScrolling" | "LeftCenterWrap";
export type TextHAlign = "Left" | "Center" | "Right";
export type TextVAlign = "Top" | "Center" | "Bottom";

export interface HytaleAnchor {
    // Posición / Márgenes (L, R, T, B)
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;

    // Dimensiones (W, H)
    width?: number | string;
    height?: number | string;
    auto?: boolean;

    // Restricciones (Min/Max)
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
}

export interface HytalePadding {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}

export interface HytaleNode {
    id: string;
    type: string;
    parentId: string | null;
    name?: string;
    
    anchor: HytaleAnchor;
    
    properties: {
        // 1. Estado y Lógica (Binding)
        visible?: boolean;
        enabled?: boolean;
        binding?: string;   // Para conectar con datos del juego
        macro?: string;     // Para XML macros

        // 2. Comportamiento de Hijos (Layout)
        layoutMode?: LayoutMode;
        flexWeight?: number; // Cuánto espacio ocupa si el padre es Flex
        scrollStyle?: string;

        // 3. Espaciado Interno
        padding?: HytalePadding

        // 4. Contenido
        text?: string;
        
        // 5. Apariencia y Estilo
        background?: string;    // "Bg"
        styleRaw?: string;      // "Style (Raw)" - Nombre del estilo en assets
        color?: string;         // Color de texto/icono principal

        // 6. Tipografía
        textHAlign?: TextHAlign; 
        textVAlign?: TextVAlign;
        fontSize?: number;
        isBold?: boolean;
        isUppercase?: boolean;
        
        // --- Helpers del Editor (No necesariamente van al JSON final) ---
        fillConstraint?: "None" | "Full" | "Horizontal" | "Vertical"; 
    };
}