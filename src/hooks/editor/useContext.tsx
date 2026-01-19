import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { HytaleNode } from "@/types/editor";
import { useEditorZoom } from "@/hooks/editor/canvas/useEditorZoom";
import { useEditorHistory } from "@/hooks/editor/useEditorHistory";

interface EditorContextType {
    elements: HytaleNode[];
    setElements: (elements: HytaleNode[], saveToHistory?: boolean) => void;
    targets: (HTMLElement | SVGElement)[];
    setTargets: (t: (HTMLElement | SVGElement)[]) => void;
    canvasSize: { width: number; height: number };
    setCanvasSize: (size: { width: number; height: number }) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    zoom: number;
    setZoom: (t: number) => void;
    clearProject: () => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // 1. Estado local básico
    const [elements, _setElements] = useState<HytaleNode[]>([]);
    const [targets, setTargets] = useState<(HTMLElement | SVGElement)[]>([]);
    const [canvasSize, setCanvasSize] = useState({ width: 1920, height: 1080 });
    const STORAGE_KEY = "hyve_ui_editor_v1";

    // 2. Usar Hooks personalizados
    const { zoom, setZoom } = useEditorZoom();
    const history = useEditorHistory([]); 


    useEffect(() => {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    _setElements(parsed);
                    history.addToHistory(parsed);
                }
            } catch (e) {
                console.error("Error loading localStorage", e);
            }
        }
    }, []);

    // Persistencia automática
    useEffect(() => {
        if (elements.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(elements));
        }
    }, [elements]);

    // 4. Lógica unificada de actualización
    const setElements = useCallback((newElements: HytaleNode[], saveToHistory = true) => {
        _setElements(newElements);
        if (saveToHistory) {
            history.addToHistory(newElements);
        }
    }, [history]);

    // 5. Wrappers para Undo/Redo (conectan historial con estado visual)
    const handleUndo = useCallback(() => {
        const prevElements = history.undo();
        if (prevElements) {
            _setElements(prevElements);
            setTargets([]); // Limpiar selección al deshacer
        }
    }, [history]);

    const handleRedo = useCallback(() => {
        const nextElements = history.redo();
        if (nextElements) {
            _setElements(nextElements);
            setTargets([]);
        }
    }, [history]);

    const clearProject = useCallback(() => {
        if (globalThis.confirm("¿Estás seguro de que quieres borrar todo el diseño?")) {
            setElements([], true);
            setTargets([]);
            localStorage.removeItem(STORAGE_KEY);
            history.clearHistory();
        }
    }, [setElements, history]);

    return (
        <EditorContext.Provider
            value={{
                elements,
                setElements,
                targets,
                setTargets,
                canvasSize,
                setCanvasSize,
                zoom,
                setZoom,
                undo: handleUndo,
                redo: handleRedo,
                canUndo: history.canUndo,
                canRedo: history.canRedo,
                clearProject
            }}
        >
            {children}
        </EditorContext.Provider>
    );
};

export const useEditorContext = () => {
    const context = useContext(EditorContext);
    if (!context) throw new Error("useEditorContext must be used within EditorProvider");
    return context;
};