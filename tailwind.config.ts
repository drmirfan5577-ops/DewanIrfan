import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        urdu: ["'Noto Nastaliq Urdu'", "'Amiri'", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        gold: {
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
        emerald: {
          soft: "#6ee7b7",
        },
      },
      animation: {
        "gradient-shift": "gradientShift 8s ease infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "color-cycle": "colorCycle 4s ease-in-out infinite",
        "fade-scale": "fadeScale 0.4s ease-out forwards",
        shimmer: "shimmer 3s linear infinite",
      },
      keyframes: {
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
