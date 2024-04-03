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
        xxl: "5rem",
        xl: "2rem",
        l: "1.5rem",
        m: "1.2rem",
        r: "1rem",
        s: "0.8rem",
        xs: "0.5rem",
        xxs: "0.2rem",
      },
      backgroundColor: {
        darkgray: "#232323",
        gray: "#808080",
        lightgray: "#D3D3D3",
        brightgray: "#efeeee",

        red: "#be5656",
        lightred: "#F87171",
        brightred: "#fcafaf",

        orange: "#ce8320",
        lightorange: "#fb9e24",
        brightorange: "#fbd9ad",

        yellow: "#bb9537",
        lightyellow: "#FBBF24",
        brightyellow: "#f8e3ab",

        green: "#23924c",
        lightgreen: "#34d36e",
        brightgreen: "#a8d6b9",

        blue: "#366cae",
        lightblue: "#60A5FA",
        brightblue: "#b3d0f3",

        purple: "#856fc9",
        lightpurple: "#A78BFA",
        brightpurple: "#d3c7f6",
      },
      colors: {
        gray: "#808080",
        lightgray: "#D3D3D3",
        brightgray: "#efeeee",

        red: "#be5656",
        lightred: "#F87171",
        brightred: "#fcafaf",

        orange: "#ce8320",
        lightorange: "#fb9e24",
        brightorange: "#fbd9ad",

        yellow: "#bb9537",
        lightyellow: "#FBBF24",
        brightyellow: "#f8e3ab",

        green: "#23924c",
        lightgreen: "#34d36e",
        brightgreen: "#a8d6b9",

        blue: "#366cae",
        lightblue: "#60A5FA",
        brightblue: "#b3d0f3",

        purple: "#856fc9",
        lightpurple: "#A78BFA",
        brightpurple: "#d3c7f6",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transfrom: "rotate(360deg)" },
        },
      },
      animation: {
        pulse: "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        spin: "spin 2s linear infinite",
      },
    },
    transitionProperty: {
      height: "height",
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
