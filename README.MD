# ⚒️ WayhomeUI - Visual Hytale Interface Builder

**WayhomeUI** es un editor visual diseñado para la creación de interfaces de usuario para **Hytale**. Permite a los desarrolladores y modders diseñar menús, paneles y HUDs de forma visual (estilo Figma/Canva) y exportar automáticamente código **DSL (.ui)** perfectamente estructurado y compatible con el motor del juego.

---

## ✨ Características Principales

-   **Manipulación Profesional:** Motor de movimiento, redimensionado y ajuste de elementos con controles visuales de alta precisión (powered by `react-moveable`).
-   **Jerarquía de Capas Recursiva:** Árbol de elementos con soporte para anidación infinita, colapso de grupos y reordenamiento mediante Drag & Drop.
-   **Hytale DSL Native:** Pensado para el sistema de `Anchor` y `LayoutMode` (Top, Left, TopScrolling) propio de Hytale.
-   **Registry de Componentes:** Sistema modular que permite mapear componentes de la librería estándar (`Common.ui`) como `@TextButton`, `@CheckBoxWithLabel` o `@DecoratedContainer`.
-   **Historial de Cambios (Undo/Redo):** Sistema robusto de historial (Ctrl+Z / Ctrl+Y) para revertir cualquier acción.
-   **Persistencia Local:** Guardado automático en `localStorage` e importación/exportación de proyectos en formato `.json` para compartir o respaldar.

---

## 🚀 Tecnologías Utilizadas

-   **React 18** + **Vite** (Entorno ultra rápido).
-   **TypeScript** (Tipado estricto para la integridad de los nodos de la UI).
-   **SCSS Modules** (Estética técnica basada en el lenguaje visual de Hytale).
-   **Moveable & Selecto** (Motor de interacción y selección múltiple).
-   **React Context API** (Gestión de estado global y sincronización de paneles).

---

## ⌨️ Atajos de Teclado (Editor Pro)

| Atajo | Acción |
| :--- | :--- |
| `Ctrl + Z` | Deshacer (Undo) |
| `Ctrl + Y` | Rehacer (Redo) |
| `Click + Arrastrar` | Selección en bloque de múltiples elementos |

---



---

## 🤝 Contribución (PRs are Open!)

¡Las contribuciones son lo que hacen que la comunidad de Hytale sea increíble! Si tienes una idea para mejorar el editor o quieres mapear nuevos componentes de `Common.ui`, tu ayuda es bienvenida.

### ¿Cómo contribuir?

1.  **Fork** el proyecto.
2.  Crea una **Rama** para tu mejora (`git checkout -b feature/AmazingFeature`).
3.  Haz **Commit** de tus cambios (`git commit -m 'Add some AmazingFeature'`).
4.  **Push** a la rama (`git push origin feature/AmazingFeature`).
5.  Abre un **Pull Request**.

### Áreas prioritarias para contribuir:
-   **Mapeo de Componentes:** Añadir definiciones en `registry.ts` para elementos como `ColorPicker`, `Slider` o `TabControl`.
-   **Visuales Hytale:** Mejorar los componentes en `visualsHytale.tsx` para que se parezcan más a las texturas reales del juego.
-   **Traducciones:** Ayudar con el soporte multi-idioma del editor.

---

Desarrollado por y para para la comunidad de desarrolladores de **Hytale**.
**Hyve UI - El diseño de interfaces, hecho simple.**