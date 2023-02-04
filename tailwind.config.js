/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,html}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1320px",
      "3xl": "1536px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        "2xl": "0.75rem",
      },
    },
    extend: {
      width: {
        18: "4.5rem",
        49: "12.25rem",
      },
      height: {
        "2px": "2px",
      },
      fontSize: {
        "32px": "2rem",
      },
      colors: {
        "smoke-dark": "#0D0D0D",
        "light-black": "#1C1C1E",
        "light-purple": "#4636AB",
        "light-white": "#F2F2F2",
        "orange-pink": "#F26E50",
      },
      animation: {
        "line-middle": "line-middle-each-side 3s ease-in-out infinite",
      },
      keyframes: {
        "line-middle-each-side": {
          "0%": { "background-color": "red" },
          "100%": { "background-color": "yellow" },
        },
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
  plugins: [],
};
