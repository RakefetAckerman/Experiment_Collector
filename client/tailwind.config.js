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
        "button-grey": "#FAFAFA"
      },
    },
  },
  plugins: [],
}

