import type { ReactNode } from "react";

export function Button({
  children,
  disabled,
}: {
  children?: ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      className={`w-full p-2 font-bold rounded-full cursor-pointer duration-300
          ${
            disabled
              ? "bg-zinc-700 text-zinc-500 animate-pulse"
              : "bg-[#04A51E] hover:bg-[#038318] text-zinc-300"
          }`}
      type="submit"
      disabled={disabled}
    >
      {disabled ? children + ".." : children}
    </button>
  );
}
