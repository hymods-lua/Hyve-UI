import { TransformSection, LayoutSection, ContentSection, AppearanceSection } from "./SidebarSections";
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
            <header className={style.header}>
                <span className={style.type_badge}>
                    {config.label} <small>({element.type})</small>
                </span>
                <div className={style.id_input_wrapper}>
                    <span className={style.hash}>#</span>
                    <input 
                        type="text"
                        className={style.id_input}
                        defaultValue={element.id}
                        key={element.id}
                        onKeyDown={actions.handleRename}
                    />
                </div>
            </header>

            {/* SECCIONES DINÁMICAS */}
            <div className={style.content}>
                
                {config.sections.includes("Transform") && (
                    <TransformSection element={element} updateAnchor={actions.updateAnchor} />
                )}

                {config.sections.includes("Layout") && (
                    <LayoutSection element={element} updateProp={actions.updateProp} />
                )}

                {config.sections.includes("Content") && (
                    <ContentSection element={element} updateProp={actions.updateProp} />
                )}

                {config.sections.includes("Appearance") && (
                    <AppearanceSection element={element} updateProp={actions.updateProp} />
                )}

            </div>
        </aside>
    );
}