import type { TodoType } from "@/types/todo";

export interface TodoContextType {
  todos: TodoType[];
  createTodo: (text: string) => void;
  updateTodo: (id: number, text: string) => void;
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
  loading: boolean;
}
