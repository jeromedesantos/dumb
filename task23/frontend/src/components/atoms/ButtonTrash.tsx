import { Trash2 } from "lucide-react";
import type { MouseEvent } from "react";

export function ButtonTrash({
  onClick,
  disabled,
}: {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}) {
  return (
    <button
      className="cursor-pointer h-fit text-zinc-500 bg-transperant border-0"
      onClick={onClick}
      disabled={disabled}
    >
      <Trash2 />
    </button>
  );
}
