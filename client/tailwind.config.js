/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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

