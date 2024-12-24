/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#F8F7F5",
        "light-gray": "#E4E4E4",
      },
      maxWidth: {
        landing: "1075px",
      },
      colors: {
        primary: "#202124",
        grayout: "#909090",
        "light-gray": "#E4E4E4",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
