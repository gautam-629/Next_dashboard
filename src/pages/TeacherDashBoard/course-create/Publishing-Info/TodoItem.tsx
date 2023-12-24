import React, { useState } from 'react';

import { IconTrash, IconCheck, IconEdit } from '@tabler/icons-react';
interface Todo {
  id: number;
  text: string;
}

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  console.log(todo, '@todo');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(todo.id, editedText);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center p-2 border-b ">
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="border rounded p-1"
        />
      ) : (
        <div className="my-sm font-normal text-normal">{todo.text}</div>
      )}
      <div className="flex gap-lg">
        {isEditing ? (
          <IconCheck size={26} strokeWidth={1.5} color={'green'} onClick={handleSaveClick} />
        ) : (
          <IconEdit size={26} strokeWidth={1.5} color={'black'} onClick={handleEditClick} />
        )}
        <IconTrash size={26} strokeWidth={1.5} color={'red'} onClick={() => onDelete(todo.id)} />
      </div>
    </div>
  );
};

export default TodoItem;
