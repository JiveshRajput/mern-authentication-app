/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        'roboto': 'Roboto, Arial, sans-serif',
        'inter': 'Inter, Arial, sans-serif',
      }
    },
  },
  plugins: [],
}

