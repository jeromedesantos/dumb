import { useState, type ReactNode } from "react";
import { TodoContext } from "./TodoContext";
import type { TodoType } from "@/types/todo";

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(false);
  const [idCounter, setIdCounter] = useState(1);

  function createTodo(text: string) {
    setLoading(true);
    const newTodo: TodoType = { id: idCounter, text, completed: false };
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
    setIdCounter((prevId) => prevId + 1);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  function updateTodo(id: number, text: string) {
    setLoading(true);
    setTodos((prevTodo) =>
      prevTodo.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  function deleteTodo(id: number) {
    setLoading(true);
    setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  function toggleComplete(id: number) {
    setTodos((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        createTodo,
        updateTodo,
        deleteTodo,
        toggleComplete,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
