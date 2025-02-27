import { useState } from "react";
import { updateTodo, deleteTodo } from "../services/todo";
import { Todo } from "../types/todo";

interface Props {
  todo: Todo;
  onUpdate: () => void;
}

const TodoItem = ({ todo, onUpdate }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleUpdate = async () => {
    await updateTodo(todo.id, title);
    setEditMode(false);
    onUpdate();
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
    onUpdate();
  };

  return (
    <li className="flex justify-between items-center p-2 bg-gray-100 rounded text-black">
      {editMode ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-1 rounded w-full"
        />
      ) : (
        <span>{todo.title}</span>
      )}

      <div className="flex space-x-2">
        {editMode ? (
          <button onClick={handleUpdate} className="text-green-500">✔</button>
        ) : (
          <button onClick={() => setEditMode(true)} className="text-blue-500">✏</button>
        )}
        <button onClick={handleDelete} className="text-red-500">❌</button>
      </div>
    </li>
  );
};

export default TodoItem;
