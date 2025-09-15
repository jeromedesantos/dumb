import { TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";

export function Alert({
  children,
  variant,
}: {
  children?: ReactNode;
  variant?: string;
}) {
  return (
    <div
      className={`bg-zinc-800 p-4 rounded-xl flex flex-col gap-2 font-bold  ${
        variant === "danger" ? "text-red-500" : "text-white"
      }`}
    >
      <div className="flex items-center gap-2 text-lg">
        <TriangleAlert size="20" />
        <h1>{variant === "danger" ? "Error!" : "Alert"}</h1>
      </div>
      <p>{children}</p>
    </div>
  );
}
