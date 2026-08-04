import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A0B1A",
        surface: "#1A1B3A",
        gold: "#D4A030",
        crimson: "#B91C1C",
        "text-primary": "#F8F9FA",
        "text-muted": "#94A3B8",
        glass: "rgba(212, 160, 48, 0.15)",
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        ember: "ember 3s ease-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(212, 160, 48, 0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(212, 160, 48, 0.6)" },
        },
        ember: {
          "0%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(-100px) scale(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "phoenix-gold": "linear-gradient(135deg, #D4A030, #B91C1C)",
      },
    },
  },
  plugins: [],
};
export default config;
