interface InputFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
}

export const InputField = ({ name, label, ...props }: InputFieldProps) => {
  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-gray-90 text-sm font-bold"
        >
          {label}
        </label>
      )}
      <input
        name={name}
        type="text"
        className="w-full px-2.5 py-3 rounded-lg border border-gray-30 outline-none text-sm text-gray-90 focus:border-primary"
        {...props}
      />
    </>
  );
};
