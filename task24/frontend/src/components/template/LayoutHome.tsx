import type { ReactNode } from "react";

export function LayoutHome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex justify-center bg-black font-plus text-sm">
      <div className="w-full max-w-xl">{children}</div>
    </div>
  );
}
