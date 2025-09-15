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
              ? "bg-gray-700 text-gray-500 animate-pulse"
              : "bg-[#04A51E] hover:bg-[#038318] text-white"
          }`}
      type="submit"
      disabled={disabled}
    >
      {disabled ? children + ".." : children}
    </button>
  );
}
