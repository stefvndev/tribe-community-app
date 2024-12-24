/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#F8F7F5",
      },
      maxWidth: {
        landing: "1075px",
      },
      colors: {
        grayout: "#909090",
      },
    },
  },
  plugins: [],
};
