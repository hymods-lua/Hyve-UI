import { Canvas } from "@/components/ui/editor/Canvas/Canvas";
import style from "./editorpage.module.scss";
import SidebarLeft from "@/components/ui/editor/SidebarLeft/SidebarLeft";
import SidebarRight from "@/components/ui/editor/SidebarRight/SidebarRight";
import Toolbar from "@/components/ui/editor/Toolbar/Toolbar";
import { EditorProvider } from "@/hooks/editor/useContext";
import { useEditor } from "@/hooks/editor/useEditor";
import { useEditorShortcuts } from "@/hooks/editor/useEditorShortcuts";

const EditorContent = () => {
    const { 
        undo, 
        redo, 
        handleDeleteSelected, 
        handleDuplicateSelected,
        handleDeselect 
    } = useEditor();

    // Activamos los atajos
    useEditorShortcuts({
        undo,
        redo,
        onDelete: handleDeleteSelected,
        onDuplicate: handleDuplicateSelected,
        onEsc: handleDeselect
    });

    return (
        <div className={style.editorGrid}>
            <Toolbar />
            <div className={style.workspace}>
                <SidebarLeft/>
                    <section className={style.canvasContainer}>
                        <Canvas />
                    </section>
                <SidebarRight/>
            </div>
        </div>
    );
};

const EditorPage = () => {
    return (
        <EditorProvider>
            <EditorContent />
        </EditorProvider>
    );
};

export default EditorPage;