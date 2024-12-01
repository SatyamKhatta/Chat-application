/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary:'#00adb5',
        secondary:"#058187"
      }
    },
  },
  plugins: [],
}

