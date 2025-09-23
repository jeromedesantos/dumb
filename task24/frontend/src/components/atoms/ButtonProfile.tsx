import type { ReactNode } from "react";

export function ButtonProfile({
  loading,
  children,
  onClick,
}: {
  loading?: boolean;
  children?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={`${
        loading && "animate-pulse"
      } cursor-pointer max-w-fit bg-zinc-900 text-zinc-300 font-bold border-2 border-zinc-300 py-1 px-3 rounded-full`}
    >
      {loading ? children + ".." : children}
    </button>
  );
}
