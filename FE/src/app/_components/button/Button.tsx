import React, { ButtonHTMLAttributes, ElementType, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
  types?: "primary" | "secondary" | "gray" | "danger";
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  as?: ElementType;
}

const buttonConfig = {
  // Colors
  primary: {
    bgColor: "bg-primary",
    color: "text-white",
  },
  secondary: {
    bgColor: "bg-secondary",
    color: "text-gray-90",
  },
  gray: {
    bgColor: "bg-gray-30",
    color: "text-gray-60",
  },
  danger: {
    bgColor: "bg-danger-base",
    color: "text-white",
  },

  // Sizes
  small: "px-3 py-2 text-xs",
  medium: "px-4 py-2 text-sm",
  large: "px-5 py-2 text-lg",
};

export const Button = ({
  children,
  types = "primary",
  size = "medium",
  backgroundColor,

  as: Component = "button",
  ...props
}: ButtonProps) => {
  return (
    <Component
      type="button"
      className={`min-h-10 rounded-lg ${buttonConfig[size]} ${buttonConfig[types].bgColor} ${buttonConfig[types].color}`}
      {...props}
    >
      {children}
    </Component>
  );
};
