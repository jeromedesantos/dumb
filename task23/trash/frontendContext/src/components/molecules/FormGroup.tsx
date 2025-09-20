import type { ReactNode, FormEvent } from "react";
import { Logo } from "./../atoms";

export function FormGroup({
  children,
  title,
  onSubmit,
}: {
  children?: ReactNode;
  title?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form className="flex flex-col gap-3" action="submit" onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        <Logo />
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      {children}
    </form>
  );
}
