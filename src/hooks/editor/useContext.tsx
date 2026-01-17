import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { HytaleNode } from "./types";

interface EditorContextType {
  elements: HytaleNode[];
  targets: (HTMLElement | SVGElement)[];
  setTargets: (t: (HTMLElement | SVGElement)[]) => void;
  setElements: (elements: HytaleNode[], saveToHistory?: boolean) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  zoom: number,
  setZoom: (t: number) => void;
  clearProject: () => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [elements, _setElements] = useState<HytaleNode[]>([]);
  const [history, setHistory] = useState<HytaleNode[][]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [zoom, setZoom] = useState(1);
  const [targets, setTargets] = useState<(HTMLElement | SVGElement)[]>([]);
  const STORAGE_KEY = "hyve_ui_editor_v1";

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
          const parsed = JSON.parse(savedData);
          if (Array.isArray(parsed) && parsed.length > 0) {
              setElements(parsed, false); 
          }
      } catch (e) {
          console.error("Error cargando desde localStorage", e);
      }
    }
  }, []); 

  useEffect(() => {
    if (elements.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(elements));
    }
  }, [elements]);

  useEffect(() => {
    localStorage.setItem("hyve_ui_zoom", zoom.toString());
  }, [zoom]);

  // Cargar zoom inicial
  useEffect(() => {
    const savedZoom = localStorage.getItem("hyve_ui_zoom");
    if (savedZoom) setZoom(parseFloat(savedZoom));
  }, []);

  const clearProject = () => {
    if (window.confirm("¿Estás seguro de que quieres borrar todo el diseño?")) {
        setElements([], true); // Guardamos en historial por si se arrepiente (Ctrl+Z)
        setTargets([]);
        localStorage.removeItem("hyve_ui_editor_v1");
    }
  };

  // Función principal para actualizar elementos
  const setElements = useCallback((newElements: HytaleNode[], saveToHistory = true) => {
    _setElements(newElements);

    if (saveToHistory) {
      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push([...newElements]);
      if (newHistory.length > 50) newHistory.shift();
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
    }
  }, [history, currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      _setElements([...history[prevIndex]]);
      setTargets([]); // Limpiamos selección para evitar errores visuales
    }
  }, [currentIndex, history]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      _setElements([...history[nextIndex]]);
      setTargets([]);
    }
  }, [currentIndex, history]);

  return (
    <EditorContext.Provider value={{ 
      elements, setElements, undo, redo, 
      canUndo: currentIndex > 0, 
      canRedo: currentIndex < history.length - 1,
      targets, setTargets,
      zoom, setZoom,
      clearProject
    }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) throw new Error("useEditorContext debe usarse dentro de EditorProvider");
  return context;
};