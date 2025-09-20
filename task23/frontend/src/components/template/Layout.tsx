import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen w-full flex justify-center bg-zinc-950 font-plus text-sm">
      <Outlet />
    </div>
  );
}
