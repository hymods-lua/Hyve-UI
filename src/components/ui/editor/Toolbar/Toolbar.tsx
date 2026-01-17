import { useEditor } from "@/hooks/editor/useEditor";
import style from "./toolbar.module.scss";
import { 
    BiUndo, BiRedo, BiTargetLock, 
    BiZoomIn, BiZoomOut, BiCodeAlt, 
    BiShow, BiGridAlt, 
    BiImport,
    BiFileBlank
} from "react-icons/bi";
import { downloadDSL, downloadProject } from "@/utils/GenerateDSL";
import React from "react";

export default function Toolbar() {
    const { setElements, elements, undo, redo, zoom, setZoom, clearProject } = useEditor();
    const handleZoom = (delta: number) => {
        // Limitamos el zoom entre 10% y 200%
        setZoom(Math.min(Math.max(zoom + delta, 0.1), 2));
    };
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                
                // Validación básica: ¿Es un array de elementos?
                if (Array.isArray(json)) {
                    // Actualizamos el estado y guardamos en el historial (true)
                    setElements(json, true);
                    alert("Proyecto cargado con éxito");
                } else {
                    alert("El archivo no tiene un formato válido de WayhomeUI");
                }
            } catch (error) {
                console.error("Error al parsear el JSON:", error);
                alert("Error al leer el archivo. Asegúrate de que sea un .json válido.");
            }
        };
        reader.readAsText(file);
        
        // Limpiamos el input para poder cargar el mismo archivo dos veces si se desea
        e.target.value = "";
    };


    return (
        <nav className={style.toolbar}>
            <div className={style.group}>
                <button className={style.icon_btn} title="Deshacer (Ctrl+Z)" onClick={undo}>
                    <BiUndo />
                </button>
                <button className={style.icon_btn} title="Rehacer (Ctrl+Y)" onClick={redo}>
                    <BiRedo />
                </button>
                <div className={style.divider} />
                <button className={`${style.icon_btn} ${style.active}`} title="Ajuste Magnético (Snap)">
                    <BiTargetLock />
                </button>
                <button className={style.icon_btn} title="Mostrar Cuadrícula">
                    <BiGridAlt />
                </button>
            </div>

            {/* GRUPO 2: VISUALIZACIÓN / ZOOM */}
            <div className={style.group}>
                <div className={style.zoom_controls}>
                    <button onClick={() => handleZoom(-0.1)} className={style.zoom_btn}><BiZoomOut /></button>
                    <span className={style.zoom_value}>{Math.round(zoom * 100)}%</span>
                    <button onClick={() => handleZoom(0.1)} className={style.zoom_btn}><BiZoomIn /></button>
                </div>
            </div>

            {/* GRUPO 3: ACCIONES FINALES */}
            <div className={style.group}>
                <button className={style.preview_btn}>
                    <BiShow />
                    <span>Previsualizar</span>
                </button>
                <button 
                    className={style.preview_btn} 
                    onClick={clearProject}
                    title="Nuevo Proyecto"
                >
                    <BiFileBlank />
                    <span>Nuevo</span>
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    accept=".json" 
                    onChange={handleImportJson} 
                />
                {/* BOTÓN DE IMPORTAR */}
                <button 
                    className={style.preview_btn} 
                    onClick={() => fileInputRef.current?.click()}
                    title="Importar Proyecto JSON"
                >
                    <BiImport />
                    <span>Importar</span>
                </button>
                
                <button 
                    className={style.export_btn} 
                    onClick={() => downloadDSL(elements)}
                >
                    <BiCodeAlt />
                    <span>Exportar DSL</span>
                </button>

                <button className={style.export_btn} onClick={() => downloadProject(elements)}>
                    Guardar Proyecto (.json)
                </button>
            </div>
        </nav>
    );
}