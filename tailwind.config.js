const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "src/app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "src/pages/**/*.{js,ts,jsx,tsx}",
    "src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", ...fontFamily.sans],
        chivo: ["var(--font-chivo-mono)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "15px",
          sm: "0",
          lg: "0",
          xl: "0",
          "2xl": "0",
        },
        screens: {
          sm: "540px",
          md: "720px",
          lg: "960px",
          xl: "960px",
          "2xl": "960px",
        },
      },
      screens: {
        xs: "425px",
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1200px",
        "2xl": "1440px",
      },
      colors: {
        primary: {
          white: "hsla(0, 0%, 100%, 1)",
          button: "hsla(248, 62%, 44%, 1)",
        },
        secondary: {
          black: "hsla(0, 0%, 4%, 1)",
          button: "hsla(248, 62%, 58%, 1)",
        },
        highlight: {
          skyblue: "hsla(213, 55%, 92%, 1)",
          blue: "hsla(213, 59%, 45%, 1)",
          grey: "hsla(0, 1%, 79%, 0.5)",
          black: "hsla(0, 0%, 8%, 1)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
