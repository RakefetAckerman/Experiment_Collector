/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'tablet': '850px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {

      colors: {
        "buttons-blue": "#C0DFFD",
        "background-grey": "#F2F2F2",
        "button-grey": "#FAFAFA",
        "black-half": "rgba(0,0,0,0.5)",
        "button-light-blue": "#E8EEF4",
      },
    },
  },
  plugins: [],
}

