/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        git: {
          dark: '#0d1117',
          gray: '#161b22',
          border: '#30363d',
          text: '#c9d1d9',
          pink: '#f472b6', // Pink accent replacing green
          red: '#da3633', // For errors/rejection
          green: '#238636' // Keep green for success/merge
        }
      }
    },
  },
  plugins: [],
}