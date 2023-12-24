import React from 'react';
interface BackendProps {
  id: number;
  label: string;
}
function BackendItem({ id, label }: BackendProps) {
  return (
    <div>
      Backend Item ID: {id}, Label: {label}
    </div>
  );
}

export default BackendItem;
