import { LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";

export function Pending({ children }: { children: ReactNode }) {
  return (
    <div className="text-zinc-300 flex flex-col items-center gap-2 font-bold animate-pulse text-center">
      <LoaderCircle className="animate-spin" /> <p>{children}</p>
    </div>
  );
}
