import { useEffect } from "react";

interface ShortcutsProps {
    undo: () => void;
    redo: () => void;
    onDelete: () => void;
    onDuplicate: () => void;
    onEsc: () => void;       
}

export const useEditorShortcuts = ({ undo, redo, onDelete, onDuplicate, onEsc }: ShortcutsProps) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            if (['INPUT', 'TEXTAREA', 'SELECT', 'CONTENTEDITABLE'].includes(target.tagName) || target.isContentEditable) return;
            const isCtrlOrCmd = e.ctrlKey || e.metaKey;

            switch (e.key) {
                case 'z':
                case 'Z':
                    if (isCtrlOrCmd) {
                        e.preventDefault();
                        e.shiftKey ? redo() : undo();
                    }
                    break;
                case 'y':
                case 'Y':
                    if (isCtrlOrCmd) {
                        e.preventDefault();
                        redo();
                    }
                    break;

                // --- Acciones de Elementos ---
                case 'Delete':
                case 'Backspace':
                    onDelete();
                    break;

                case 'd':
                case 'D':
                    if (isCtrlOrCmd) {
                        e.preventDefault();
                        onDuplicate();
                    }
                    break;
                
                case 'Escape':
                    onEsc();
                    break;
            }
        };

        globalThis.addEventListener("keydown", handleKeyDown);
        return () => globalThis.removeEventListener("keydown", handleKeyDown);
    }, [undo, redo, onDelete, onDuplicate, onEsc]);
};