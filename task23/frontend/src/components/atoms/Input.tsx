import type { ChangeEvent, ReactNode } from "react";

export function Input({
  children,
  type,
  id,
  value,
  onChange,
}: {
  children?: ReactNode;
  type?: string;
  id?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={id}
        placeholder=""
        required
        className="peer w-full px-4 pt-6 pb-2 bg-transparent text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-2 text-sm text-white transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-400"
      >
        {children} <span className="text-red-500">*</span>
      </label>
    </div>
  );
}
