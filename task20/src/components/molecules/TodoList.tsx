import { useTodo } from "@/hooks/useTodo";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos, loading } = useTodo();

  return (
    <div className="min-h-screen max-w-2xl mx-auto flex flex-col  gap-10 items-center">
      {loading && <p>Loading...</p>}
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
