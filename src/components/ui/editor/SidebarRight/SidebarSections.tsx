import { BiMove, BiLayout, BiFont, BiPalette, BiCodeAlt, BiExpand, BiAlignLeft, BiAlignMiddle, BiAlignRight, BiVerticalTop, BiVerticalCenter, BiVerticalBottom } from "react-icons/bi";
import { SectionHeader, PropertyInput, PropertySelect, PropertySwitch, ButtonGroup, PropertyGrid } from './SidebarUI';
import style from "./sidebarright.module.scss";
import { HytaleNode } from "@/types/editor";

interface LogicSectionProps {
    element: HytaleNode;
    updateProp: (prop: string, val: any) => void;
    updateName: (val: string) => void; // <--- Nuevo prop
}


// ==========================================
// 1. LOGIC & STATE (Nombre Java, Binding, Flags)
// ==========================================
export const LogicSection = ({ element, updateProp, updateName}: LogicSectionProps) => (
    <section className={style.section}>
        <SectionHeader icon={BiCodeAlt} title="Lógica & Estado" />
        
        {/* Nombre interno para Java */}
        <PropertyInput 
            label="ID Code (Name)" 
            placeholder="btnAccept"
            value={element.name || ""}
            onChange={(v:string) => updateName(v)} 
        />

        <PropertyInput 
            label="Binding (Data)" 
            placeholder="player.inventory"
            value={element.properties.binding || ""} 
            onChange={(v:any) => updateProp("binding", v)} 
        />

        <div className={style.row_2_col}>
            <PropertyInput 
                label="Macro" 
                placeholder="clickSound"
                value={element.properties.macro || ""} 
                onChange={(v:any) => updateProp("macro", v)} 
            />
             {/* Flags básicos */}
            <div style={{display:'flex', flexDirection:'column', gap: 5}}>
                <PropertySwitch label="Visible" value={element.properties.visible !== false} onChange={(v:boolean) => updateProp("visible", v)} />
                <PropertySwitch label="Enabled" value={element.properties.enabled !== false} onChange={(v:any) => updateProp("enabled", v)} />
            </div>
        </div>
    </section>
);

// --- TRANSFORM SECTION ---
export const TransformSection = ({ element, updateAnchor }: any) => {
    
    // Helpers para rellenar rápido
    const handleFill = (mode: 'full' | 'horiz' | 'vert') => {
        if (mode === 'full') updateAnchor({ left: 0, top: 0, width: "100%", height: "100%" });
        if (mode === 'horiz') updateAnchor({ left: 0, width: "100%" });
        if (mode === 'vert') updateAnchor({ top: 0, height: "100%" });
    };

    return (
        <section className={style.section}>
            <SectionHeader icon={BiMove} title="Transform & Tamaño" />
            
            {/* Coordenadas */}
            <div className={style.input_grid}>
                <PropertyInput label="X" type="number" value={Math.round(element.anchor.left || 0)} onChange={(v:any) => updateAnchor("left", v)} />
                <PropertyInput label="Y" type="number" value={Math.round(element.anchor.top || 0)} onChange={(v:any) => updateAnchor("top", v)} />
                <PropertyInput label="W" type="text" value={element.anchor.width} onChange={(v:any) => updateAnchor({ width: v })} />
                <PropertyInput label="H" type="text" value={element.anchor.height} onChange={(v:any) => updateAnchor({ height: v })} />
            </div>

            {/* Fill Constraints Buttons */}
            <ButtonGroup label="Rellenar (Constraints)">
                <button onClick={() => handleFill('horiz')} title="Fill Horizontal"><BiExpand style={{transform:'rotate(90deg)'}}/></button>
                <button onClick={() => handleFill('vert')} title="Fill Vertical"><BiExpand/></button>
                <button onClick={() => handleFill('full')} title="Fill All" style={{fontSize: 10}}>FULL</button>
            </ButtonGroup>
        </section>
    );
};

// --- LAYOUT SECTION ---
const layoutOptions = [
    { value: "None", label: "None (Canvas Libre)" },
    { value: "Full", label: "Full (Llenar Todo)" },
    { value: "Top", label: "Top (Columna Std)" },
    { value: "Bottom", label: "Bottom (Pegado Abajo)" },
    { value: "Left", label: "Left (Fila Horiz.)" },
    { value: "Right", label: "Right (Fila Inv.)" },
    { value: "Middle", label: "Middle (Centro Vert.)" },
    { value: "Center", label: "Center (Centro Horiz.)" },
    { value: "MiddleCenter", label: "Middle Center (Total)" },
    { value: "TopScrolling", label: "Top Scrolling" },
];

const scrollOptions = [
    { value: "Default", label: "Default" },
    { value: "Hidden", label: "Oculto" },
    { value: "Always", label: "Siempre Visible" },
];
export const LayoutSection = ({ element, updateProp }: any) => {
    
    // Helper para actualizar un lado específico del padding sin borrar los otros
    const setPad = (key: string, val: number) => {
        const current = element.properties.padding || { top:0, bottom:0, left:0, right:0 };
        updateProp("padding", { ...current, [key]: val });
    };
    
    // Fallback para evitar errores si padding es undefined
    const p = element.properties.padding || { top:0, bottom:0, left:0, right:0 };

    return (
        <section className={style.section}>
            <SectionHeader icon={BiLayout} title="Layout & Espaciado" />
            <div className={style.input_group}>
                <PropertySelect 
                    label="Modo de Distribución"
                    value={element.properties.layoutMode || "None"} 
                    options={layoutOptions} 
                    onChange={(v: any) => updateProp("layoutMode", v)} 
                />
            </div>

            <div className={style.row_2_col}>
                <PropertyInput 
                    label="Flex Weight" 
                    placeholder="0 (Fijo) - 1 (Estirar)"
                    type="number"
                    value={element.properties.flexWeight || 0} 
                    onChange={(v: any) => updateProp("flexWeight", v)} 
                />
                 <PropertySelect 
                    label="Scroll"
                    value={element.properties.scrollStyle || "Default"} 
                    options={scrollOptions} 
                    onChange={(v: any) => updateProp("scrollStyle", v)} 
                />
            </div>

            <PropertyGrid label="Padding Interno">
                <PropertyInput label="Top" type="number" placeholder="0" value={p.top} onChange={(v:any) => setPad("top", v)} />
                <PropertyInput label="Right" type="number" placeholder="0" value={p.right} onChange={(v:any) => setPad("right", v)} />
                <PropertyInput label="Bottom" type="number" placeholder="0" value={p.bottom} onChange={(v:any) => setPad("bottom", v)} />
                <PropertyInput label="Left" type="number" placeholder="0" value={p.left} onChange={(v:any) => setPad("left", v)} />
            </PropertyGrid>
        </section>
    );
};

// --- CONTENT SECTION ---
export const ContentSection = ({ element, updateProp }: any) => (
    <section className={style.section}>
        <SectionHeader icon={BiFont} title="Contenido & Alineación" />
        
        <PropertyInput 
            label="Texto" 
            value={element.properties.text || ""} 
            onChange={(v:any) => updateProp("text", v)} 
        />

        <div className={style.row_2_col}>
            <ButtonGroup label="Text H-Align">
                <button onClick={() => updateProp("textHAlign", "Left")} className={element.properties.textHAlign === "Left" ? style.active : ""}><BiAlignLeft/></button>
                <button onClick={() => updateProp("textHAlign", "Center")} className={element.properties.textHAlign === "Center" ? style.active : ""}><BiAlignMiddle/></button>
                <button onClick={() => updateProp("textHAlign", "Right")} className={element.properties.textHAlign === "Right" ? style.active : ""}><BiAlignRight/></button>
            </ButtonGroup>

            {/* Vertical Align */}
            <ButtonGroup label="Text V-Align">
                <button onClick={() => updateProp("textVAlign", "Top")} className={element.properties.textVAlign === "Top" ? style.active : ""}><BiVerticalTop/></button>
                <button onClick={() => updateProp("textVAlign", "Center")} className={element.properties.textVAlign === "Center" ? style.active : ""}><BiVerticalCenter/></button>
                <button onClick={() => updateProp("textVAlign", "Bottom")} className={element.properties.textVAlign === "Bottom" ? style.active : ""}><BiVerticalBottom/></button>
            </ButtonGroup>
        </div>
    </section>
);

// --- APPEARANCE SECTION ---
export const AppearanceSection = ({ element, updateProp }: any) => (
    <section className={style.section}>
        <SectionHeader icon={BiPalette} title="Apariencia" />
        
        <div className={style.row_2_col}>
            <PropertyInput 
                label="Color Texto" 
                type="color"
                value={element.properties.color || "#ffffff"} 
                onChange={(v:any) => updateProp("color", v)} 
            />
            <PropertyInput 
                label="Bg Color" 
                type="color"
                placeholder="#000000"
                value={element.properties.background || ""} 
                onChange={(v:any) => updateProp("background", v)} 
            />
        </div>

        <div className={style.row_2_col} style={{marginTop: 10}}>
             <PropertySwitch label="Bold" value={element.properties.isBold} onChange={(v:any) => updateProp("isBold", v)} />
             <PropertySwitch label="Uppercase" value={element.properties.isUppercase} onChange={(v:any) => updateProp("isUppercase", v)} />
        </div>

        <PropertyInput 
            label="Raw Style (Asset)" 
            placeholder="@DefaultButtonStyle"
            value={element.properties.styleRaw || ""} 
            onChange={(v:any) => updateProp("styleRaw", v)} 
        />
    </section>
);