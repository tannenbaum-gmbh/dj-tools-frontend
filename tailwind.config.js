/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'menu-highlight': '#86efac', // light green color for menu highlights
        'menu-highlight-hover': '#65d97a', // slightly darker green for hover
      },
    },
  },
  plugins: [],
}