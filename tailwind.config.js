/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        rugged: {
          50: "#fef2ee",
          100: "#fce1d9",
          200: "#f9bfb0",
          300: "#f4937d",
          400: "#e05a3e",
          500: "#c94b30",
          600: "#a33d26",
          700: "#7d2f1d",
          800: "#5a2316",
          900: "#3d180f",
        },
        sand: {
          50: "#f5f2f0",
          100: "#f0f0f0",
          200: "#eae6e1",
          300: "#ddd8d2",
          400: "#c4bfb8",
          500: "#a8a29e",
          600: "#5c5c5c",
          700: "#3a3a3a",
          800: "#2a2826",
          900: "#303030",
          950: "#1a1a1a",
        },
      },
      fontFamily: {
        mono: ["'IBM Plex Mono'", "Courier New", "monospace"],
        sans: ["'Inter'", "-apple-system", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
