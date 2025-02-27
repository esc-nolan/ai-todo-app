import { useState } from "react";
import { generateTodoWithGroq } from "../utils/groq";
import { addTodo } from "../services/todo";

interface Props {
    onAdd: () => void;
  }
const AIGeneratedTodos = ({ onAdd }: Props) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const todos = await generateTodoWithGroq(input);
      setSuggestions(todos);
      console.log("Generated AI suggestions:", todos);
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
    }
    setLoading(false);
  };

  const handleAdd = async ({ newTodo }: { newTodo: string }) => {
      if (!newTodo.trim()) return;
      await addTodo(newTodo);
      onAdd();
    };

  return (
    <div className="p-4 bg-gray-100 rounded">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 border rounded w-full text-black"
        placeholder="Enter a task idea..."
      />
      <button onClick={handleGenerate} className="mt-2 p-2 bg-blue-500 text-white rounded">
        {loading ? "Generating..." : "Generate AI Suggestions"}
      </button>

      <ul className="mt-4 space-y-2">
        {suggestions.map((todo, index) => (
          <li key={index} className="p-2 bg-white rounded shadow flex justify-between text-black">
            {todo}
            <button onClick={() => handleAdd({newTodo: todo})} className="text-blue-500">
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AIGeneratedTodos;
