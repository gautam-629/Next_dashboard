import React from 'react';
import { useDrop } from 'react-dnd';

interface TreeNodeProps {
  data: TreeNodeData;
  onDrop: (targetNodeId: number, item: { id: number; label: string }) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ data, onDrop }) => {
  const [, drop] = useDrop({
    accept: 'backend',
    drop: (item: { id: number; label: string }) => {
      onDrop(data.id, item);
    },
  });

  return (
    <div ref={drop}>
      {data.label}
      {data.children.map((child) => (
        <TreeNode key={child.id} data={child} onDrop={onDrop} />
      ))}
    </div>
  );
};

export default TreeNode;

interface TreeNodeData {
  id: number;
  label: string;
  children: TreeNodeData[];
}
