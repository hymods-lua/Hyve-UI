import { useEditor } from "@/hooks/editor/useEditor";
import style from "./toolbar.module.scss";
import { 
    BiUndo, BiRedo,
    BiZoomIn, BiZoomOut, BiCodeAlt, 
    BiImport,
    BiFileBlank,
    BiDesktop
} from "react-icons/bi";
import { downloadDSL, downloadProject } from "@/utils/GenerateDSL";
import React from "react";
import { VIEWPORT_PRESETS } from "@/hooks/editor/libraries/registry";
import { generateJava } from "@/utils/generateJava";

export default function Toolbar() {
    const { setElements, elements, undo, redo, zoom, setZoom, clearProject, canvasSize, setCanvasSize } = useEditor();
    const handleZoom = (delta: number) => {
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
                if (Array.isArray(json)) {
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

    const handleExportJava = () => {
        // 1. Filtrar nodos (si quieres omitir nodos ocultos, etc)
        const javaCode = generateJava(
            elements, 
            "MainMenuGui",       // Nombre de la clase
            "Pages/MainMenu.ui"  // Ruta del archivo UI (la que genera el DSL)
        );
        
        // 2. Descargar o Copiar
        navigator.clipboard.writeText(javaCode);
        alert("Código Java copiado al portapapeles!");
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
            </div>

            {/* GRUPO 2: VISUALIZACIÓN / ZOOM */}
            <div className={style.group}>
                <div className={style.zoom_controls}>
                    <button onClick={() => handleZoom(-0.1)} className={style.zoom_btn}><BiZoomOut /></button>
                    <span className={style.zoom_value}>{Math.round(zoom * 100)}%</span>
                    <button onClick={() => handleZoom(0.1)} className={style.zoom_btn}><BiZoomIn /></button>
                </div>
            </div>

            <div className={style.group}>
                <div className={style.viewport_selector}>
                    <BiDesktop />
                    <select 
                        value={`${canvasSize.width}x${canvasSize.height}`}
                        onChange={(e) => {
                            const [w, h] = e.target.value.split('x').map(Number);
                            setCanvasSize({ width: w, height: h });
                        }}
                    >
                        {VIEWPORT_PRESETS.map(preset => (
                            <option key={preset.id} value={`${preset.width}x${preset.height}`}>
                                {preset.label} ({preset.width}x{preset.height})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* GRUPO 3: ACCIONES FINALES */}
            <div className={style.group}>
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
                <button 
                    className={style.export_btn} 
                    onClick={() => handleExportJava()}
                >
                    <BiCodeAlt />
                    <span>Exportar Java</span>
                </button>
                <button className={style.export_btn} onClick={() => downloadProject(elements)}>
                    Guardar Proyecto (.json)
                </button>
            </div>
        </nav>
    );
}