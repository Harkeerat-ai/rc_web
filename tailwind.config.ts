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
        primary: "#1E1610",
        surface: "#2E241B",
        gold: "#E3B250",
        rust: "#C85A1E",
        shadowblack: "#1E1610",
        ivory: "#FCF7EC",
        "text-primary": "#FCF7EC",
        "text-muted": "#C9BCA8",
        glass: "rgba(227, 178, 80, 0.2)",
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
        "phoenix-gold": "linear-gradient(135deg, #E3B250, #C85A1E)",
      },
    },
  },
  plugins: [],
};
export default config;
