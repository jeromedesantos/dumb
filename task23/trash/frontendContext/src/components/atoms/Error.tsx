import type { ReactNode } from "react";
import { Annoyed } from "lucide-react";

export function Error({ children }: { children?: ReactNode }) {
  return (
    <h1 className="size-50 font-bold text-white flex flex-col gap-5 justify-center items-center text-center">
      <Annoyed className="size-30" />
      {children}
    </h1>
  );
}
