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
        primary: "#14100C",
        surface: "#221A13",
        gold: "#D4A030",
        rust: "#B7410E",
        shadowblack: "#14100C",
        ivory: "#F5EFE1",
        "text-primary": "#F5EFE1",
        "text-muted": "#B3A48F",
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
          "0%": { boxShadow: "0 0 5px rgba(226, 168, 60, 0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(226, 168, 60, 0.6)" },
        },
        ember: {
          "0%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(-100px) scale(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "phoenix-gold": "linear-gradient(135deg, #D4A030, #B7410E)",
      },
    },
  },
  plugins: [],
};
export default config;
