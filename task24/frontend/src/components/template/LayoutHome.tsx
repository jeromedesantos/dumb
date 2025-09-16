import type { ReactNode } from "react";

export function LayoutHome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex justify-center bg-zinc-950 font-plus text-sm">
      {children}
    </div>
  );
}
