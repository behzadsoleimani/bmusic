/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#12181B",
        "dark-hovered": "#1b2428",
      }
    },
  },
  plugins: [],
}
