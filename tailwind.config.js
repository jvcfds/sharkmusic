/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      container: { center: true, padding: "1rem" },
      colors: {
        shark: {
          50: '#e0f2ff',
          100: '#b9e1ff',
          200: '#8dcfff',
          300: '#5fb8ff',
          400: '#339fff',
          500: '#007BFF', // cor principal
          600: '#0064d6',
          700: '#004ea6',
          800: '#003975',
          900: '#002245',
        },
      },
    },
  },
  plugins: [],
}
