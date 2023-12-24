import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { Button } from '@mantine/core';

interface Todo {
  id: number;
  text: string;
}

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
  onAdd: (newTask: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onEdit, onAdd }) => {
  const [newTask, setNewTask] = useState('');

  const handleAddClick = () => {
    if (newTask.trim() !== '') {
      onAdd(newTask);
      setNewTask('');
    }
  };

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
      ))}
      <div className="flex justify-between mt-xs">
        <input
          type="text"
          placeholder="Add new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="input w-[80%]"
        />
        <Button
          size="lg"
          className="ml-xs px-3 py-1 bg-primary-1000 text-white w-[20%]"
          onClick={handleAddClick}
        >
          Add Item
        </Button>
      </div>
    </div>
  );
};

export default TodoList;
