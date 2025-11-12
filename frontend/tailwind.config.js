// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brandBlue: "#3b82f6",
        brandLightBlue: "#60a5fa",
        brandCyan: "#22d3ee",
      },
    },
  },
  plugins: [],
}