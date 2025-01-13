/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#F8F7F5",
        "light-gray": "#E4E4E4",
        "dark-gray": "#909090",
        "yellow-primary": "#F8D481",
        "yellow-primary-hover": "#F1D07C",
      },
      maxWidth: {
        1075: "1075px",
      },
      colors: {
        "dark-primary": "#202124",
        grayout: "#909090",
        "light-gray": "#E4E4E4",
        "link-blue": "#2E6Ef5",
        "yellow-primary": "#F8D481",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        custom: `
          rgba(60, 64, 67, 0.32) 0px 1px 2px,
          rgba(60, 64, 67, 0.15) 0px 2px 6px,
          rgba(0, 0, 0, 0.1) 0px 1px 8px
        `,
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
