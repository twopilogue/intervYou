import { ChangeEvent } from "react";

interface CheckBoxProps {
  id: string;
  name: string;
  value: number;
  label: string;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckBox({ id, label, checked = false, ...props }: CheckBoxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-1">
      <input type="checkbox" checked={checked} {...props} />
      <span className="text-sm text-gray-90"> {label}</span>
    </label>
  );
}
