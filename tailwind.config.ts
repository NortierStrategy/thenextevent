import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0A0A0A",
        dark: "#141414",
        medium: "#1E1E1E",
        light: "#2A2A2A",
        text: "#F5F0EB",
        "text-muted": "#A09A95",
        red: "#9B1B24",
        "red-dark": "#6E131A",
        "red-light": "#B82530",
        gold: "#C4A35A",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        outfit: ["var(--font-outfit)", "Helvetica Neue", "sans-serif"],
      },
      spacing: {
        section: "100px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
