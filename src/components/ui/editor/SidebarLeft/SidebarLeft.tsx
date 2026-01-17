import style from "./sidebarleft.module.scss";
import { LayersPanel } from "./LayersPanel";
import { LibraryPanel } from "./LibraryPanel";

export default function SidebarLeft() {
  return (
    <aside className={style.sidebar}>
        <div>
            <LibraryPanel/>
            <div className={style.divider} />
            {/* SECCIÓN JERARQUÍA */}
            <LayersPanel/>
        </div>
    </aside>
  );
}