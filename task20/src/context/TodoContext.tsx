import type { TodoContextType } from "@/types/todoContext";
import { createContext } from "react";

export const TodoContext = createContext<TodoContextType | null>(null);
