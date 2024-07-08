import { ChangeEvent } from "react";

interface RadioProps {
  id: string;
  name: string;
  value: number;
  label: string;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Radio({ id, label, checked = false, ...props }: RadioProps) {
  return (
    <label className="flex cursor-pointer items-center gap-1">
      <input type="radio" checked={checked} {...props} />
      <span className="text-sm text-gray-90"> {label}</span>
    </label>
  );
}
