import {supabase}  from "../lib/supabase";
import { Todo } from "../types/todo";

// Fetch Todos
export const fetchTodos = async (): Promise<Todo[]> => {
  const { data, error } = await supabase.from("todos").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
};

// Add a Todo
export const addTodo = async (title: string): Promise<Todo> => {
  const { data, error } = await supabase.from("todos").insert([{ title }]).select().single();
  if (error) throw error;
  return data;
};

// Update a Todo
export const updateTodo = async (id: number, title: string) => {
  const { error } = await supabase.from("todos").update({ title }).eq("id", id);
  if (error) throw error;
};

// Delete a Todo
export const deleteTodo = async (id: number) => {
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) throw error;
};
