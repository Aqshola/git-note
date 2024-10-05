/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'comic-neue': ["Comic Neue", 'cursive']
      },
      colors: {
        'purple-primary': '#4D46DD',
        'orange-primary': "#FFC04F",
        'soft-white': "#FCFCFC",
        'soft-gray': "#F6F6F6",
        'line-gray': "#E0E0E0",
        'write-gray': "#737373"
      }
    },
  },
  plugins: [],
}