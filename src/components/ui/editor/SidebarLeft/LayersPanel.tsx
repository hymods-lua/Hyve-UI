import { useLayerTree } from "@/hooks/editor/sidebarleft/useLayerTree";
import { LayerItem } from "./LayerItem";
import style from './sidebarleft.module.scss';
import { BiLayer } from "react-icons/bi";

export const LayersPanel = () => {
    const { 
        elements, collapsedIds, targets, 
        toggleCollapse, handleSelect, handleDrop, deleteElement, handleDropToRoot,
        handleReorder
    } = useLayerTree();

    const actions = { toggleCollapse, handleSelect, handleDrop, deleteElement, handleReorder };
    const rootElements = elements.filter(el => el.parentId === null);

    return (
        <section className={`${style.section} ${style.section_layers}`}>
            <div 
                className={style.section__header}
                onDragOver={e => e.preventDefault()}
                onDrop={handleDropToRoot} 
                style={{ cursor: 'copy' }}
            >
                <h4 className={style.section__title}>Jerarquía</h4>
                <BiLayer className={style.icon_small} />
            </div>
           
            <div className={style.layers_list}>
                {rootElements.length > 0 ? (
                    rootElements.map(el => (
                        <LayerItem 
                            key={el.id}
                            element={el}
                            depth={0}
                            allElements={elements}
                            collapsedIds={collapsedIds}
                            targets={targets}
                            actions={actions}
                        />
                    ))
                ) : (
                    <div className={style.empty_text}>
                         No hay capas
                    </div>
                )}
            </div>
        </section>
    );
};