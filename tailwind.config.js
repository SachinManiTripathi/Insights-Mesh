/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],

  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#fbbf24',       // amber-400
          dark: '#1f2937',        // slate-800
        },
      },
    },
  },
  plugins: [],
}

