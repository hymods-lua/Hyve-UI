import { Canvas } from "@/components/ui/editor/Canvas/Canvas";
import style from "./editorpage.module.scss";
import SidebarLeft from "@/components/ui/editor/SidebarLeft/SidebarLeft";
import SidebarRight from "@/components/ui/editor/SidebarRight/SidebarRight";
import Toolbar from "@/components/ui/editor/Toolbar/Toolbar";
import { EditorProvider } from "@/hooks/editor/useContext";
const EditorPage = () => {


  return (
    <EditorProvider>
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
    </EditorProvider>
  );
};

export default EditorPage;