import type { ReactNode } from "react";

export function LayoutAuth({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 font-plus text-sm">
      {children}
    </div>
  );
}
