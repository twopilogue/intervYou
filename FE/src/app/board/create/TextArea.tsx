import { InputHTMLAttributes } from "react";

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

export default function TextArea({ name, ...props }: TextAreaProps) {
  return (
    <>
      <label className="mb-2 block text-sm font-bold text-gray-90" htmlFor={name}>
        내용
      </label>
      <textarea
        name={name}
        className="h-[calc(100%-0.875rem-1.25rem-0.5rem)] w-full resize-none overflow-hidden overflow-y-auto rounded-lg border border-gray-30 px-2.5 py-2.5 text-sm text-gray-90 outline-none focus:border-primary"
        {...props}
      />
    </>
  );
}
