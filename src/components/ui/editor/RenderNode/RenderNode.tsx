import React from "react";
import { COMPONENT_REGISTRY } from "@/hooks/editor/registry";
import { HytaleNode } from "@/hooks/editor/types";

interface Props {
  node: HytaleNode;
  allNodes: HytaleNode[];
}

export const RenderNode: React.FC<Props> = ({ node, allNodes }) => {
    const config = COMPONENT_REGISTRY[node.type] || COMPONENT_REGISTRY["Group"];
    const VisualComponent = config.visual;
    const childrenNodes = allNodes.filter((child) => child.parentId === node.id);

    return (
        <VisualComponent 
            node={node} 
            isRoot={!node.parentId}
        >
            <span style={{ 
                position: 'absolute', top: 2, left: 4, 
                fontSize: '8px', color: 'rgba(255,215,0,0.5)', 
                zIndex: 100, pointerEvents: 'none',
                fontFamily: 'monospace'
            }}>
                {node.id}
            </span>

            {childrenNodes.map((child) => (
                <RenderNode key={child.id} node={child} allNodes={allNodes} />
            ))}
        </VisualComponent>
    );
};