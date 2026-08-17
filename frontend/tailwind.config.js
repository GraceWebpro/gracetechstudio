/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}"
  ],

  theme: {
    extend: {

      colors: {

        background: "#09090B",

        surface: "#111827",

        surfaceLight: "#1F2937",

        border: "#27272A",

        primary: "#7C3AED",

        primaryHover: "#6D28D9",

        success: "#22C55E",

        warning: "#F59E0B",

        danger: "#EF4444",

        text: "#FAFAFA",

        muted: "#A1A1AA",

        input: "#111827"

      },

      fontFamily: {

        sans: [
          "Inter",
          "system-ui",
          "sans-serif"
        ]

      },

      borderRadius: {

        xl: "1rem",

        "2xl": "1.5rem",

        "3xl": "2rem"

      },

      boxShadow: {

        card: "0 10px 30px rgba(0,0,0,.25)",

        glow: "0 0 40px rgba(124,58,237,.35)"

      },

      transitionTimingFunction: {

        smooth: "cubic-bezier(.4,0,.2,1)"

      }

    },
  },

  plugins: [],
}