import { useState, useCallback } from "react";
import { HytaleNode } from "@/types/editor";

export const useEditorHistory = (initialElements: HytaleNode[]) => {
    const [history, setHistory] = useState<HytaleNode[][]>([initialElements]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const addToHistory = useCallback((newElements: HytaleNode[]) => {
        const newHistory = history.slice(0, currentIndex + 1);
        newHistory.push([...newElements]);
        if (newHistory.length > 50) newHistory.shift();
        setHistory(newHistory);
        setCurrentIndex(newHistory.length - 1);
    }, [history, currentIndex]);

    const undo = useCallback((): HytaleNode[] | null => {
        if (currentIndex > 0) {
        const prevIndex = currentIndex - 1;
        setCurrentIndex(prevIndex);
        return [...history[prevIndex]];
        }
        return null;
    }, [currentIndex, history]);

    const redo = useCallback((): HytaleNode[] | null => {
        if (currentIndex < history.length - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        return [...history[nextIndex]];
        }
        return null;
    }, [currentIndex, history]);

    const clearHistory = useCallback(() => {
        setHistory([[]]);
        setCurrentIndex(0);
    }, []);

    return {
        addToHistory,
        undo,
        redo,
        clearHistory,
        canUndo: currentIndex > 0,
        canRedo: currentIndex < history.length - 1
    };
};