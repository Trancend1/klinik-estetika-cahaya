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
        sage: {
          50: "#F2F7F4",
          100: "#DCEBE3",
          300: "#A8CDB8",
          500: "#5B9E78",
          700: "#3D6E53",
          900: "#22402F",
        },
        blush: {
          50: "#FBF3F1",
          100: "#F6E1DC",
          300: "#E8B5AB",
        },
        gold: {
          100: "#F5EDD8",
          400: "#C9A961",
        },
        gray: {
          50: "#FAFAF9",
          100: "#F2F1EF",
          300: "#D6D3CE",
          500: "#78736C",
          700: "#403C37",
          900: "#1F1C19",
        },
        status: {
          blue: "#3B82F6",
          green: "#16A34A",
          amber: "#D97706",
          gray: "#9CA3AF",
        },
        error: {
          500: "#DC2626",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;
