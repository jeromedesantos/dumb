// Input.jsx (komponen atom)
import type { ReactNode } from "react";
import React from "react";

// Atur prop dengan tipe yang benar
type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  children?: ReactNode;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ children, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          placeholder=""
          required
          className="peer w-full px-4 pt-6 pb-2 bg-transparent text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <label
          htmlFor={props.id}
          className="absolute left-4 top-2 text-sm text-white transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-400"
        >
          {children} <span className="text-red-500">*</span>
        </label>
      </div>
    );
  }
);
