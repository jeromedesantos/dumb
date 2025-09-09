import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useState } from "react";
import { useTodo } from "@/hooks/useTodo";
import type { TodoType } from "@/types/todo";
import { Label } from "../ui/label";

export default function TodoItem({ todo }: { todo: TodoType }) {
  const { updateTodo, deleteTodo, toggleComplete, loading } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const [loadUp, setLoadUp] = useState<number | null>(null);
  const [loadDel, setLoadDel] = useState<number | null>(null);

  function handleUpdate() {
    setLoadUp(todo.id);
    setTimeout(() => {
      updateTodo(todo.id, text);
      setIsEditing(false);
      setLoadUp(null);
    }, 500);
  }

  function handleDelete() {
    setLoadDel(todo.id);
    setTimeout(() => {
      deleteTodo(todo.id);
      setLoadDel(null);
    }, 500);
  }

  return (
    <div className="max-w-2xl flex items-center gap-2">
      {isEditing ? (
        <>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={loading}
          />
          {loadUp ? (
            <Button>Loading...</Button>
          ) : (
            <Button onClick={handleUpdate} disabled={loading}>
              Save
            </Button>
          )}
        </>
      ) : (
        <div className="flex items-center gap-5 ">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => toggleComplete(todo.id)}
              className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded-md"
            />
            <Label className={`flex-2 ${todo.completed ? "line-through" : ""}`}>
              {todo.text}
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsEditing(true)} disabled={loading}>
              Edit
            </Button>
            {loadDel ? (
              <Button>Loading...</Button>
            ) : (
              <Button onClick={handleDelete} disabled={loading}>
                Delete
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
