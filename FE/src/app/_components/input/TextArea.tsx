import { InputHTMLAttributes } from "react";

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  placeholder: string;
  onChange?: any;
}

export const TextArea = ({ name, label, ...props }: TextAreaProps) => {
  return (
    <>
      {label && (
        <label className="mb-2 block text-sm font-bold text-gray-90" htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        className="h-min w-full resize-none overflow-hidden rounded-lg border border-gray-30 px-2.5 py-2.5 text-sm text-gray-90 outline-none focus:border-primary"
        rows={1}
        {...props}
      />
    </>
  );
};

TextArea.displayName = "TextArea";
