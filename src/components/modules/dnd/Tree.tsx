import React from 'react';
import TreeNode from './TreeNode';

interface TreeProps {
  data: TreeNodeData[];
  onDrop: (targetNodeId: number, item: { id: number; label: string }) => void;
}

const Tree: React.FC<TreeProps> = ({ data, onDrop }) => {
  return (
    <div>
      {data.map((node) => (
        <TreeNode key={node.id} data={node} onDrop={onDrop} />
      ))}
    </div>
  );
};

export default Tree;

interface TreeNodeData {
  id: number;
  label: string;
  children: TreeNodeData[];
}
