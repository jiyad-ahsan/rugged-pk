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
          100: "#edeceb",
          200: "#e4e1dd",
          300: "#ddd8d2",
          400: "#c4bfb8",
          500: "#a8a29e",
          600: "#6b6b6b",
          700: "#3d3d3d",
          800: "#2e2e2e",  // cards / elevated surfaces (dark)
          900: "#222222",  // page bg (dark)
          950: "#191919",  // deepest recessed areas (dark)
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
