'use client';
import TreeGraph from 'react-d3-tree';
import React, { useCallback, useState } from 'react';
import { TreeNode } from './tree-node';
// @ts-ignore

const renderForeignObjectNode = ({ nodeDatum, foreignObjectProps }) => (
  <g className="-translate-x-10 -translate-y-5">
    {/* `foreignObject` requires width & height to be explicitly set. */}
    <foreignObject className="h-[100px] max-w-[220px]" {...foreignObjectProps}>
      <TreeNode node={nodeDatum} />
    </foreignObject>
  </g>
);
// @ts-ignore
export const Tree = ({ data }) => {
  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 270, y: 75 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y };

  return (
    <div
      id="treeWrapper"
      // @ts-ignore

      ref={containerRef}
      className="h-[80vh] rounded-md bg-gray-200 bg-graph p-5 shadow-md"
    >
      <TreeGraph
        // @ts-ignore

        translate={translate}
        hasInteractiveNodes={true}
        renderCustomNodeElement={(rd3tProps) =>
          // @ts-ignore
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps, data })
        }
        separation={{ siblings: 2, nonSiblings: 2 }}
        collapsible={false}
        data={data}
        nodeSize={nodeSize}
      />
    </div>
  );
};

export const useCenteredTree = () => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  // @ts-ignore
  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 8, y: height / 2.5 });
    }
  }, []);
  return [translate, containerRef];
};
