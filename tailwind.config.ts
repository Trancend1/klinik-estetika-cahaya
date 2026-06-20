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
          200: "#C2DDCB",
          300: "#A8CDB8",
          400: "#82B598",
          500: "#5B9E78",
          600: "#4C865E",
          700: "#3D6E53",
          800: "#315745",
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
          200: "#E4E2DE",
          300: "#D6D3CE",
          400: "#A39F99",
          500: "#78736C",
          600: "#5C5853",
          700: "#403C37",
          800: "#2E2B28",
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
      fontSize: {
        "display": ["36px", { lineHeight: "44px", fontWeight: "600" }],
        "display-md": ["44px", { lineHeight: "52px", fontWeight: "600" }],
        "display-lg": ["52px", { lineHeight: "60px", fontWeight: "600" }],
        "h1": ["28px", { lineHeight: "36px", fontWeight: "600" }],
        "h1-md": ["34px", { lineHeight: "44px", fontWeight: "600" }],
        "h1-lg": ["38px", { lineHeight: "46px", fontWeight: "600" }],
        "h2": ["22px", { lineHeight: "30px", fontWeight: "500" }],
        "h2-md": ["28px", { lineHeight: "36px", fontWeight: "500" }],
        "h3": ["18px", { lineHeight: "26px", fontWeight: "600" }],
        "lead": ["18px", { lineHeight: "28px" }],
        "lead-md": ["20px", { lineHeight: "32px" }],
        "body": ["16px", { lineHeight: "26px" }],
        "small": ["14px", { lineHeight: "22px" }],
        "tiny": ["13px", { lineHeight: "20px" }],
      },
      borderRadius: {
        "2xl": "1rem",
        full: "9999px",
      },
      boxShadow: {
        "card": "0 1px 3px 0 rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 12px 0 rgba(0,0,0,0.06), 0 2px 4px -2px rgba(0,0,0,0.04)",
        "elevated": "0 8px 24px 0 rgba(0,0,0,0.06), 0 2px 8px 0 rgba(0,0,0,0.04)",
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "fade-in": "fade-in 0.6s ease-out both",
        "scale-in": "scale-in 0.4s ease-out both",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
