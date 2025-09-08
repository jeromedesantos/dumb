import { Outlet } from "react-router-dom";
import { TodoProvider } from "@/context/TodoProvider";

export default function ContextRoute() {
  return (
    <TodoProvider>
      <Outlet /> {/* semua child route akan dapat akses ke Context */}
    </TodoProvider>
  );
}
