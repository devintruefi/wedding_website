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
        // Forest — deep mountain greens
        "forest-deep": "#16201A",
        forest: "#22332A",
        "forest-mid": "#324A38",
        "forest-soft": "#4A6650",
        // Cream / paper — warm parchment surfaces
        cream: "#F0E9D9",
        "cream-warm": "#FAF6EC",
        "cream-bright": "#FFFCF3",
        // Copper / gold — One&Only signature accents
        copper: "#B98C3F",
        "copper-soft": "#D2A85C",
        "copper-deep": "#8C6726",
        // Earth tones
        taupe: "#C9BFA8",
        "taupe-soft": "#DED4BC",
        "slate-warm": "#6B5F4E",
        "ink": "#2A2520",
        // Side accents — refined
        "side-devin": "#3B5871",
        "side-poonam": "#A8527A",
        "side-joint": "#B98C3F",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "ultra-wide": "0.32em",
        "mega-wide": "0.42em",
      },
      boxShadow: {
        paper:
          "0 1px 0 rgba(255,255,255,0.6) inset, 0 18px 40px -22px rgba(31,42,28,0.35), 0 4px 12px -8px rgba(31,42,28,0.18)",
        "paper-lg":
          "0 1px 0 rgba(255,255,255,0.7) inset, 0 28px 70px -28px rgba(31,42,28,0.45), 0 8px 22px -12px rgba(31,42,28,0.22)",
        ridge:
          "0 1px 0 rgba(255,255,255,0.4) inset, 0 -1px 0 rgba(31,42,28,0.06) inset, 0 8px 24px -16px rgba(31,42,28,0.30)",
        copper: "0 0 0 1px rgba(185,140,63,0.5), 0 8px 24px -10px rgba(185,140,63,0.45)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "drift-slow": "drift 60s linear infinite",
        "drift-slower": "drift 90s linear infinite",
        shimmer: "shimmer 2.4s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2.6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        drift: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-30%)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
