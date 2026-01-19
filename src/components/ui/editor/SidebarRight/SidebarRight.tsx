import { TransformSection, LayoutSection, ContentSection, AppearanceSection, LogicSection } from "./SidebarSections";
import { useSidebarRight } from '@/hooks/editor/sidebarright/useSidebarRight';
import style from "./sidebarright.module.scss";

export default function SidebarRight() {
    const { element, config, actions } = useSidebarRight();

    if (!element || !config) {
        return (
            <aside className={style.sidebar}>
                <div className={style.empty_state}>
                    <p>Selecciona un elemento</p>
                </div>
            </aside>
        );
    }

    return (
        <aside className={style.sidebar}>
            {/* Header: ID y Tipo */}
            <header className={style.header}>
                <span className={style.type_badge}>
                    {config.label.toUpperCase()} — {element.type}
                </span>
                <div className={style.id_input_wrapper}>
                    <span className={style.hash}>ID:</span>
                    <input 
                        type="text"
                        className={style.id_input}
                        defaultValue={element.id}
                        key={element.id}
                        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                    />
                </div>
            </header>

            <div className={style.content}>
                <LogicSection element={element} updateProp={actions.updateProp} updateName={actions.updateName} />
                {config.sections.includes("Transform") && (
                    <TransformSection 
                        element={element} 
                        updateAnchor={(keyOrObj: any, val?: any) => {
                            actions.updateAnchor(keyOrObj, val);
                        }} 
                    />
                )}
                {/* 3. Layout (Para contenedores) */}
                {config.sections.includes("Layout") && (
                    <LayoutSection element={element} updateProp={actions.updateProp} />
                )}
                {/* 4. Contenido (Para texto/botones) */}
                {config.sections.includes("Content") && (
                    <ContentSection element={element} updateProp={actions.updateProp} />
                )}
                {/* 5. Apariencia */}
                {config.sections.includes("Appearance") && (
                    <AppearanceSection element={element} updateProp={actions.updateProp} />
                )}
            </div>
        </aside>
    );
}