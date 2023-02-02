/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            container: {
                center: true,
                padding: {
                    DEFAULT: "15px",
                    sm: "0",
                    lg: "0",
                    xl: "0",
                    "2xl": "0"
                },
                screens: {
                    sm: "540px",
                    md: "720px",
                    lg: "960px",
                    xl: "1140px",
                    "2xl": "1260px"
                }
            },
            screens: {
                xs: "425px",
                sm: "480px",
                md: "768px",
                lg: "976px",
                xl: "1200px",
                "2xl": "1440px"
            },
            colors: {
                primary: {
                    white: "hsla(0, 0%, 100%, 1)",
                    button: "hsla(248, 62%, 44%, 1)"
                },
                secondary: {
                    black: "hsla(0, 0%, 4%, 1)",
                    button: "hsla(248, 62%, 58%, 1)"
                },
                hightlight: {
                    skyblue: "hsla(213, 55%, 92%, 1)",
                    blue: "hsla(213, 59%, 45%, 1)",
                    grey: "hsla(0, 1%, 79%, 0.5)",
                    black: "hsla(0, 0%, 8%, 1)"
                }
            }
        }
    },
    plugins: []
};
