import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./services/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#152033",
        "medical-blue": "#155EEF",
        "medical-blue-dark": "#0B3A8F",
        "ice-blue": "#EEF6FF",
        mint: "#DDF8EE",
        line: "#D9E2EF"
      },
      boxShadow: {
        soft: "0 20px 55px rgba(21, 32, 51, 0.1)",
        dark: "0 24px 70px rgba(0, 0, 0, 0.36)"
      }
    }
  },
  plugins: []
} satisfies Config;

export default config;
