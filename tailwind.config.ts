import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontWeight: {
        light: "300",
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      fontSize: {
        xxl: "6rem",
        xl: "4rem",
        l: "2rem",
        m: "1.5rem",
        s: "1rem",
        xs: "0.7rem",
        xxs: "0.4rem",
      },
      backgroundColor: {
        lightgray: "#D3D3D3",
        gray: "#808080",
        lightred: "#F87171",
        lightorange: "#fb9e24",
        lightyellow: "#FBBF24",
        lightgreen: "#34D399",
        lightblue: "#60A5FA",
        lightpurple: "#A78BFA",
      },
      colors: {
        lightgray: "#D3D3D3",
        gray: "#808080",
        lightred: "#F87171",
        lightorange: "#fb9e24",
        lightyellow: "#FBBF24",
        lightgreen: "#34D399",
        lightblue: "#60A5FA",
        lightpurple: "#A78BFA",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        pulse: "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
    transitionProperty: {
      height: "height",
    },
  },
  plugins: [],
};
export default config;
