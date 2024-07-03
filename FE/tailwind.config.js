/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";

export const content = ["./src/**/*.{js,ts,jsx,tsx,mdx}"];
export const theme = {
  colors: {
    primary: "#008CFF",
    secondary: "#99D1FF",
    danger: {
      base: "#EB003B",
      text: "#D50136",
    },
    white: "#fff",
    black: "#000",
    gray: {
      10: "#F8F8F8",
      20: "#E4E4E4",
      30: "#D8D8D8",
      40: "#C6C6C6",
      50: "#8E8E8E",
      60: "#717171",
      70: "#555555",
      90: "#1D1D1D",
    },
    lightblue: "#EBF6FF",
  },
  extend: {
    fontFamily: {
      sans: ["Pretendard", ...fontFamily.sans],
    },
  },
};
export const plugins = [];
