interface TextAreaProps {
  name: string;
  label?: string;
  placeholder: string;
}

export const TextArea = ({ name, label, ...props }: TextAreaProps) => {
  return (
    <div>
      {label && (
        <label
          className="block mb-2 text-gray-90 text-sm font-bold"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <textarea
        id={name}
        className="px-2.5 py-3 rounded-lg border border-gray-30 outline-none text-sm text-gray-90 focus:border-primary"
        {...props}
      />
    </div>
  );
};
