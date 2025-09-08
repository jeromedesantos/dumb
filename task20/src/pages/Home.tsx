import TodoForm from "@/components/molecules/TodoForm";
import TodoList from "@/components/molecules/TodoList";

export default function Home() {
  return (
    <div className="min-h-screen max-w-2xl mx-auto mt-10 flex flex-col  gap-10 items-center">
      <h1 className="font-black text-2xl text-center">Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}
