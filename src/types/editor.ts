export type LayoutMode = "None" | "Top" | "Left" | "TopScrolling";
export type ScrollStyle = "Default" | "Hidden" | "Always";
export type HAlign = "Left" | "Center" | "Right";
export type VAlign = "Top" | "Middle" | "Bottom";


export interface HytaleAnchor {
    // Posición / Márgenes (L, R, T, B)
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;

    // Dimensiones (W, H)
    width?: number | string;  // string para soportar "100%"
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
        scrollStyle?: ScrollStyle;
        flexWeight?: number; // Cuánto espacio ocupa si el padre es Flex
        
        // 3. Espaciado Interno
        padding?: HytalePadding

        // 4. Contenido
        text?: string;
        
        // 5. Apariencia y Estilo
        background?: string;    // "Bg"
        styleRaw?: string;      // "Style (Raw)" - Nombre del estilo en assets
        color?: string;         // Color de texto/icono principal

        // 6. Tipografía
        fontSize?: number;
        isBold?: boolean;
        isUppercase?: boolean;  // "Upper"
        
        // 7. Alineación de contenido
        contentAlignH?: HAlign;
        contentAlignV?: VAlign;
        
        // --- Helpers del Editor (No necesariamente van al JSON final) ---
        fillConstraint?: "None" | "Full" | "Horizontal" | "Vertical"; 
    };
}