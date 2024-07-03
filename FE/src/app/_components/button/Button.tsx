import React, { ElementType } from "react";

interface ButtonProps {
  types?: "primary" | "secondary" | "gray";
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
  as?: ElementType;
  href?: string;
}

const buttonConfig = {
  // Colors
  primary: {
    bgColor: "bg-primary",
    color: "text-white",
    outline: "border-primary-500 text-primary-500 bg-opacity-0 hover:bg-opacity-10",
  },
  secondary: {
    bgColor: "bg-secondary",
    color: "text-gray-90",
    outline: "border-secondary-500 text-secondary-500 bg-opacity-0 hover:bg-opacity-10",
  },
  gray: {
    bgColor: "bg-gray-30",
    color: "text-gray-60",
    outline: "border-secondary-500 text-secondary-500 bg-opacity-0 hover:bg-opacity-10",
  },

  // Sizes
  small: "px-3 py-2 text-xs",
  medium: "px-4 py-2 text-sm",
  large: "px-5 py-2 text-lg",
};

export const Button = ({
  types = "primary",
  size = "medium",
  backgroundColor,
  label,
  as: Component = "button",
  ...props
}: ButtonProps) => {
  return (
    <Component
      type="button"
      className={`rounded-lg ${buttonConfig[size]} ${buttonConfig[types].bgColor} ${buttonConfig[types].color}`}
      {...props}
    >
      {label}
    </Component>
  );
};
