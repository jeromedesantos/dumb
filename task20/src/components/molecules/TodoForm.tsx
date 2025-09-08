import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTodo } from "@/hooks/useTodo";

export default function TodoForm() {
  const [text, setText] = useState("");
  const { createTodo, loading } = useTodo();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim() === "") {
      return;
    }
    createTodo(text);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className=""
        disabled={loading}
        placeholder="Add new task.."
      />
      <Button type="submit" disabled={loading}>
        Add
      </Button>
    </form>
  );
}
