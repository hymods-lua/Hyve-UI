import { useState, useEffect, useCallback } from "react";

const STORAGE_ZOOM_KEY = "hyve_ui_zoom";

export const useEditorZoom = (initialZoom = 1) => {
    const [zoom, setZoom] = useState(initialZoom);

    // Cargar zoom inicial
    useEffect(() => {
        const savedZoom = localStorage.getItem(STORAGE_ZOOM_KEY);
        if (savedZoom) {
            setZoom(Number.parseFloat(savedZoom));
        }
    }, []);

    // Guardar zoom al cambiar
    useEffect(() => {
        localStorage.setItem(STORAGE_ZOOM_KEY, zoom.toString());
    }, [zoom]);

    // Funciones extra útiles para botones de UI
    const zoomIn = useCallback(() => setZoom(z => Math.min(z + 0.1, 3)), []);
    const zoomOut = useCallback(() => setZoom(z => Math.max(z - 0.1, 0.2)), []);
    const resetZoom = useCallback(() => setZoom(1), []);

    return { zoom, setZoom, zoomIn, zoomOut, resetZoom };
};