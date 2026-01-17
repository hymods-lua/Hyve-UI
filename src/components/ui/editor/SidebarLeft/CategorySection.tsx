import { BiChevronDown, BiChevronRight, BiBox } from "react-icons/bi";
import style from "./sidebarleft.module.scss";

interface CategorySectionProps {
    category: string;
    types: string[];
    isCollapsed: boolean;
    onToggle: () => void;
    onAdd: (config: any) => void;
    getConfig: (type: string) => any;
}

export const CategorySection = ({ 
    category, types, isCollapsed, onToggle, onAdd, getConfig 
}: CategorySectionProps) => {

    return (
        <section className={style.section}>
            {/* ENCABEZADO CLICKEABLE */}
            <div 
                className={style.section__header_clickable} 
                onClick={onToggle}
            >
                <span className={style.collapse_icon}>
                    {isCollapsed ? <BiChevronRight /> : <BiChevronDown />}
                </span>
                <h4 className={style.section__title}>{category}</h4>
            </div>

            {/* CONTENIDO (Solo si no está colapsado) */}
            {!isCollapsed && (
                <div className={style.grid_tools}>
                    {types.map((type) => {
                        const config = getConfig(type);
                        if (!config) return null;
                        
                        const Icon = config.icon;

                        return (
                            <button 
                                key={type} 
                                className={style.tool_btn} 
                                onClick={(e) => {
                                    e.stopPropagation(); // Evita colapsar al clickear botón
                                    onAdd(config);
                                }}
                            >
                                {Icon ? <Icon /> : <BiBox />} 
                                <span>{config.label}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </section>
    );
};