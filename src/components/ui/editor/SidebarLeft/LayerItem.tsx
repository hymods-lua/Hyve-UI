import React, { useMemo } from 'react';
import { BiChevronRight, BiChevronDown, BiBox, BiText, BiTrash } from 'react-icons/bi';
import style from './sidebarleft.module.scss';

interface LayerItemProps {
    element: any;
    depth: number;
    allElements: any[];
    collapsedIds: Set<string>;
    targets: any[];
    actions: {
        toggleCollapse: (id: string, e: React.MouseEvent) => void;
        handleSelect: (id: string) => void;
        handleDrop: (e: React.DragEvent, id: string) => void;
        deleteElement: (id: string) => void;
        handleReorder: (sourceId: string, targetId: string, pos: 'before' | 'after' | 'inside') => void;
    };
}

export const LayerItem: React.FC<LayerItemProps> = React.memo(({ 
    element, depth, allElements, collapsedIds, targets, actions 
}) => {
    
    // Cálculos derivados
    const isSelected = targets.some((t: any) => t.id === element.id);
    const isCollapsed = collapsedIds.has(element.id);
    const [isOver, setIsOver] = React.useState<string | null>(null); // 'before', 'after', 'inside', null
    
    // Obtenemos los hijos de este elemento específico
    const children = useMemo(() => 
        allElements.filter((el) => el.parentId === element.id), 
    [allElements, element.id]);

    const hasChildren = children.length > 0;

    return (
        <div className={style.layer_item_wrapper}>
            {/* ZONA DROP: ARRIBA (Mover antes) */}
            <div 
                className={`${style.drop_zone_edge} ${isOver === 'before' ? style.drag_over : ''}`} 
                onDragOver={e => { e.preventDefault(); setIsOver('before'); }}
                onDragLeave={() => setIsOver(null)}
                onDrop={(e) => {
                    e.stopPropagation();
                    setIsOver(null);
                    const draggedId = e.dataTransfer.getData("elementId");
                    actions.handleReorder(draggedId, element.id, 'before');
                }}
            />
            <div
                className={`${style.layer_item} ${isSelected ? style.active : ""}`}
                style={{ paddingLeft: `${depth * 15 + 12}px` }}
                onClick={() => actions.handleSelect(element.id)}
                draggable
                onDragStart={(e) => {
                    e.stopPropagation();
                    e.dataTransfer.setData("elementId", element.id);
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.stopPropagation();
                    const draggedId = e.dataTransfer.getData("elementId");
                    if (draggedId === element.id) return;

                    if (element.type === "Group" || element.type.startsWith("@Container")) {
                        actions.handleDrop(e, element.id);
                    } else {
                        actions.handleReorder(draggedId, element.id, 'after');
                    }
                }}
            >
                <div className={style.layer_content}>
                    <span 
                        className={style.collapse_icon} 
                        onClick={(e) => hasChildren ? actions.toggleCollapse(element.id, e) : null}
                        style={{ opacity: hasChildren ? 1 : 0.3 }}
                    >
                        {isCollapsed ? <BiChevronRight /> : <BiChevronDown />}
                    </span>
                    <span className={style.layer_icon}>
                        {element.type === "Group" ? <BiBox /> : <BiText />}
                    </span>
                    <span className={style.layer_name}>{element.id}</span>
                </div>
                <button className={style.delete_btn} onClick={(e) => {
                    e.stopPropagation();
                    actions.deleteElement(element.id);
                }}><BiTrash /></button>
            </div>

            <div 
                className={style.drop_zone_edge} 
                onDragOver={e => e.preventDefault()}
                onDrop={(e) => {
                    e.stopPropagation();
                    const draggedId = e.dataTransfer.getData("elementId");
                    actions.handleReorder(draggedId, element.id, 'after');
                }}
            />

            {!isCollapsed && children.map(child => (
                <LayerItem 
                    key={child.id}
                    element={child}
                    depth={depth + 1}
                    allElements={allElements}
                    collapsedIds={collapsedIds}
                    targets={targets}
                    actions={actions}
                />
            ))}
        </div>
    );
});