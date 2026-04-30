import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "forest-deep": "#1F2A1C",
        forest: "#2A3526",
        "forest-mid": "#3A4934",
        cream: "#F0E9D9",
        "cream-warm": "#FAF7F0",
        copper: "#C9A040",
        "copper-soft": "#D9B561",
        taupe: "#C9BFA8",
        "slate-warm": "#6B5F4E",
        "side-devin": "#3E5C76",
        "side-poonam": "#A8527A",
        "side-joint": "#C9A040",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "ultra-wide": "0.32em",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "drift-slow": "drift 60s linear infinite",
        "drift-slower": "drift 90s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-30%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
