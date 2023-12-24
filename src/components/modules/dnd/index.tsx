import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BackendItem from './BackendItem';
import Tree from './Tree';

interface TreeNode {
  id: number;
  label: string;
  children: TreeNode[];
}
const DragAndDrop = () => {
  const [treeData, setTreeData] = useState([
    {
      id: 1,
      label: 'Satisfied customers',
      children: [
        {
          id: 2,
          label: 'Good food',
          children: [
            {
              id: 3,
              label: 'Quality ingredients',
              children: [],
            },
            {
              id: 4,
              label: 'Good recipe',
              children: [],
            },
          ],
        },
        {
          id: 5,
          label: 'Good service',
          children: [
            { id: 6, label: 'Prompt attention', children: [] },
            { id: 7, label: 'Professional waiter', children: [] },
          ],
        },
        {
          id: 8,
          label: 'Pleasant surroundings',
          children: [
            { id: 9, label: 'Happy atmosphere', children: [] },
            { id: 10, label: 'Good table presentation', children: [] },
            { id: 11, label: 'Pleasing decor', children: [] },
          ],
        },
      ],
    },
  ]);

  const handleDrop = (targetNodeId: number, item: { id: number; label: string }) => {
    const updatedTree = [...treeData];

    const updateNode = (nodes: TreeNode[]) => {
      for (const node of nodes) {
        if (node.id === targetNodeId) {
          node.children.push({
            id: item.id,
            label: item.label,
            children: [],
          });
          break;
        } else {
          updateNode(node.children);
        }
      }
    };

    updateNode(updatedTree);
    setTreeData(updatedTree);
  };
  return (
    <div className="wrapper-x">
      <DndProvider backend={HTML5Backend}>
        <Tree data={treeData} onDrop={handleDrop} />
        {/* <BackendItem id={12} label="New Backend Item" /> */}
      </DndProvider>
    </div>
  );
};

export default DragAndDrop;
