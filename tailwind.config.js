/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#F5F6FA',
        secondary:'#FFFFFF',
        tertiary:'#00A3FE'
      }
    },
  },
  plugins: [],
}