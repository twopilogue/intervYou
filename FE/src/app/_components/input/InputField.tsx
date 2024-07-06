import { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

export const InputField = ({ name, label, ...props }: InputFieldProps) => {
  return (
    <>
      {label && (
        <label htmlFor={name} className="mb-2 block text-sm font-bold text-gray-90">
          {label}
        </label>
      )}
      <input
        type="text"
        className="w-full rounded-lg border border-gray-30 px-2.5 py-1.5 text-sm text-gray-90 outline-none focus:border-primary"
        {...props}
      />
    </>
  );
};
