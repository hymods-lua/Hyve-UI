export interface HytaleNode {
    id: string;
    type: string;
    parentId: string | null;
    
    anchor: {
        width?: number | string;
        height?: number | string;
        top?: number;
        left?: number;
        bottom?: number;
        right?: number;
    };
    
    properties: {
        text?: string;
        layoutMode?: "Top" | "Left" | "TopScrolling" | "None";
        flexWeight?: number;
        style?: string;
        background?: string;
        textColor?: string;
    };
}