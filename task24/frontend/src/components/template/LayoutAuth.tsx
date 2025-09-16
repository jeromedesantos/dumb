import type { ReactNode } from "react";

export function LayoutAuth({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black font-plus text-sm">
      <div className="w-full max-w-xs">{children}</div>
    </div>
  );
}
