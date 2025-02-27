import { useState, useEffect } from "react";
import { fetchTodos } from "../services/todo";
import { Todo } from "../types/todo";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import AIGeneratedTodos from "./aitodos";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Loader2, AlertCircle } from "lucide-react";

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center px-6 bg-gray-900 text-gray-100 transition-all font-['Poppins']">
      {/* Header */}
      <Card className="w-full max-w-2xl bg-gray-800 shadow-lg border border-gray-700 transition-all">
        <CardHeader>
          <CardTitle className="text-4xl font-extrabold text-center text-white tracking-wide">
            AI-Powered Todo App
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-400 text-lg">
            Organize tasks efficiently with AI-powered suggestions.
          </p>
        </CardContent>
      </Card>

      <div className="w-full max-w-2xl mt-8 space-y-8">
        {/* Add Todo Section */}
        <Card className="bg-gray-800 shadow-lg border border-gray-700 transition-all">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">➕ Add a New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <AddTodo onAdd={loadTodos} />
          </CardContent>
        </Card>

        {/* Todo List Section */}
        <Card className="bg-gray-800 shadow-lg border border-gray-700 transition-all">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">✅ Your Todos</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center">
                <Loader2 className="animate-spin h-6 w-6 text-gray-400" />
              </div>
            ) : error ? (
              <div className="flex items-center space-x-2 text-red-400">
                <AlertCircle className="h-6 w-6" />
                <p className="text-lg">{error}</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {todos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} onUpdate={loadTodos} />
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Separator className="border-gray-600" />

        {/* AI Suggestions Section */}
        <Card className="bg-gray-800 shadow-lg border border-gray-700 transition-all">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">🤖 AI Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <AIGeneratedTodos onAdd={loadTodos} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TodoApp;
