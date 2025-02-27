import { useState } from "react";
import { addTodo } from "../services/todo";

interface Props {
  onAdd: () => void;
}

const AddTodo = ({ onAdd }: Props) => {
  const [newTodo, setNewTodo] = useState("");

  const handleAdd = async () => {
    if (!newTodo.trim()) return;
    await addTodo(newTodo);
    setNewTodo("");
    onAdd();
  };

  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo..."
        className="border p-2 rounded w-full text-white"
      />
      <button onClick={handleAdd} className="p-2 bg-blue-500 text-white rounded">Add</button>

      {/* <AIGeneratedTodos onAdd={handleAdd} /> */}
    </div>
  );
};

export default AddTodo;
