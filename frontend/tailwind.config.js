/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        'custom-gray': '#333333',
      },
    },
  },
  plugins: []
};
