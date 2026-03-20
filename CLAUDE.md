# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Hytale UI Editor — a visual drag-and-drop editor for designing Hytale game interfaces, built with React 18 + TypeScript. Exports designs to Hytale's `.ui` DSL format.

## Commands

```bash
npm run dev          # Dev server on http://localhost:3000
npm run build        # TypeScript check + Vite build
npm run lint         # ESLint (--max-warnings 0)
npm run lint:fix     # ESLint autofix
```

No test framework is configured.

## Architecture

### State Management

All editor state lives in `EditorContext` (`src/hooks/editor/useContext.tsx`):
- `elements: HytaleNode[]` — flat array of all nodes (parent/child via `parentId`)
- `targets` — currently selected DOM elements
- `canvasSize`, `zoom` — viewport state
- `undo/redo` — history navigation (max 50 states)

Persisted to localStorage under key `hyve_ui_editor_v1`.

### Core Hooks (src/hooks/editor/)

| Hook | Role |
|------|------|
| `useEditor` | CRUD operations on elements (add, update, delete, duplicate, rename, reorder) |
| `useEditorHistory` | Undo/Redo stack management |
| `useEditorShortcuts` | Keyboard shortcut bindings |
| `useCanvasMoveable` (canvas/) | Drag/resize via react-moveable, disabled for flex layouts |
| `useSlotFactory` | Auto-generates child elements (slots) when adding components |
| `useSidebarRight` (sidebarright/) | Property inspector updates (anchor, props, name) |

### Component Library System

- `src/hooks/editor/libraries/library.ts` — component definitions (type, default anchor/properties, slots)
- `src/hooks/editor/libraries/registry.ts` — maps component types to visual React components + viewport presets

Components use `@Prefix` naming (e.g., `@PageOverlay`, `@TextButton`) matching Hytale's DSL conventions.

### Rendering Pipeline

1. `Canvas.tsx` renders root elements via `RenderNode`
2. `RenderNode.tsx` recursively renders children
3. Visual components in `src/components/ui/editor/visuals/` render each type
4. `visualUtils.ts` computes CSS from `HytaleNode` properties (flex, dimensions, padding, colors)
5. `react-moveable` handles drag/resize, `react-selecto` handles multi-select

### DSL Export (src/utils/GenerateDSL.ts)

Converts the element tree to Hytale `.ui` format:
- `@Type` components become `$C.@Type` referencing `../Common.ui`
- Colors convert from RGBA to `#RRGGBB(alpha)` format
- `downloadDSL()` exports `.ui` file, `downloadProject()` exports JSON

### Core Type: HytaleNode (src/types/editor.ts)

Each element has: `id`, `type`, `parentId`, `name`, `anchor` (position/size with min/max), and `properties` (layout, appearance, typography, binding, macro, etc.).

## Path Aliases

`@/*` → `src/*` (also `@/components/*`, `@/hooks/*`, `@/services/*`, `@/utils/*`, `@/types/*`)

## Conventions

- Code language: English. UI labels and user-facing text: Spanish.
- Styling: SCSS modules. Global variables in `src/styles/_variables.scss`, mixins in `src/styles/_mixins.scss` (auto-imported by Vite).
- No Redux — React Context only for state.
- Components as `React.FC<Props>`, functional with hooks.
