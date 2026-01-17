
import { COMPONENT_CATEGORIES } from "@/hooks/editor/registry";
import { CategorySection } from "./CategorySection";
import style from "./sidebarleft.module.scss";
import { useLibrary } from "@/hooks/editor/sidebarleft/useLibrary";

export const LibraryPanel = () => {
    const { addElement, collapsedCategories, toggleCategory, getConfig } = useLibrary();

    return (
        <div className={style.library_scroll}>
            {Object.entries(COMPONENT_CATEGORIES).map(([category, types]) => (
                <CategorySection
                    key={category}
                    category={category}
                    types={types}
                    isCollapsed={collapsedCategories.has(category)}
                    onToggle={() => toggleCategory(category)}
                    onAdd={addElement}
                    getConfig={getConfig}
                />
            ))}
        </div>
    );
};