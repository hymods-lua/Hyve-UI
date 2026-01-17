import { BiMove, BiLayout, BiFont, BiPalette } from "react-icons/bi";
import { SectionHeader, PropertyInput, PropertySelect } from './SidebarUI';
import style from "./sidebarright.module.scss";

// --- TRANSFORM SECTION ---
export const TransformSection = ({ element, updateAnchor }: any) => (
    <section className={style.section}>
        <SectionHeader icon={BiMove} title="Transform" />
        <div className={style.input_grid}>
            <PropertyInput label="X" type="number" value={Math.round(element.anchor.left || 0)} onChange={(v:any) => updateAnchor("left", v)} />
            <PropertyInput label="Y" type="number" value={Math.round(element.anchor.top || 0)} onChange={(v:any) => updateAnchor("top", v)} />
            <PropertyInput label="W" type="text" value={element.anchor.width} onChange={(v:any) => updateAnchor("width", v)} />
            <PropertyInput label="H" type="text" value={element.anchor.height} onChange={(v:any) => updateAnchor("height", v)} />
        </div>
    </section>
);

// --- LAYOUT SECTION ---
const layoutOptions = [
    { value: "None", label: "None (Absolute)" },
    { value: "Top", label: "Vertical (Top)" },
    { value: "Left", label: "Horizontal (Left)" },
    { value: "TopScrolling", label: "Top Scrolling" }
];

export const LayoutSection = ({ element, updateProp }: any) => (
    <section className={style.section}>
        <SectionHeader icon={BiLayout} title="Layout Mode" />
        <PropertySelect 
            value={element.properties.layoutMode || "None"} 
            options={layoutOptions} 
            onChange={(v: any) => updateProp("layoutMode", v)} 
        />
        <PropertyInput 
            label="Flex Weight" 
            type="number"
            value={element.properties.flexWeight || 0} 
            onChange={(v: any) => updateProp("flexWeight", v)} 
        />
    </section>
);

// --- CONTENT SECTION ---
export const ContentSection = ({ element, updateProp }: any) => (
    <section className={style.section}>
        <SectionHeader icon={BiFont} title="Contenido" />
        <PropertyInput 
            label="Texto / Valor" 
            value={element.properties.text || ""} 
            onChange={(v:any) => updateProp("text", v)} 
        />
    </section>
);

// --- APPEARANCE SECTION ---
export const AppearanceSection = ({ element, updateProp }: any) => (
    <section className={style.section}>
        <SectionHeader icon={BiPalette} title="Apariencia" />
        <PropertyInput 
            label="Estilo (@)" 
            placeholder="@DefaultLabelStyle"
            value={element.properties.style || ""} 
            onChange={(v:any) => updateProp("style", v)} 
        />
        <PropertyInput 
            label="Background" 
            placeholder="#000000(0.5)"
            value={element.properties.background || ""} 
            onChange={(v:any) => updateProp("background", v)} 
        />
    </section>
);