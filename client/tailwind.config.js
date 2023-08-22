/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "crystal-green": "#2DAA90",
      },
      fontFamily: {
        'poppins': ["Poppins", "sans-serif"],
        'robotomono': ["Roboto Mono", "monospace"]
      },
    },
  },
  plugins: [],
};
