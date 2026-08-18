import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        gold: "rgb(var(--color-gold) / <alpha-value>)",
        rust: "rgb(var(--color-rust) / <alpha-value>)",
        shadowblack: "rgb(var(--color-primary) / <alpha-value>)",
        ivory: "rgb(var(--color-ivory) / <alpha-value>)",
        "text-primary": "rgb(var(--color-ivory) / <alpha-value>)",
        "text-muted": "rgb(var(--color-text-muted) / <alpha-value>)",
        glass: "rgb(var(--color-glass) / <alpha-value>)",
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        ember: "ember 3s ease-out infinite",
        marquee: "marquee 22s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(226, 168, 60, 0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(226, 168, 60, 0.6)" },
        },
        ember: {
          "0%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(-100px) scale(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "90%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "phoenix-gold": "linear-gradient(135deg, #E3B250, #C85A1E)",
      },
    },
  },
  plugins: [],
};
export default config;