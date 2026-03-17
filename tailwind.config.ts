import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        "9xl": "96rem",
      },
      screens: {
        other: { min: "340px", max: "1200px" },
      },
      colors: {
        darkbg: "#1E293B",
        blue: {
          850: "#1e40af",
        },
      },
      keyframes: {
        ripple: {
          "0%": { width: "0", height: "0", opacity: "0.5" },
          "100%": { width: "400px", height: "400px", opacity: "0" },
        },
      },
      animation: {
        ripple: "ripple 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
