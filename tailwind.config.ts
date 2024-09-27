import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      dropShadow: {
        glow: [
          "0 0px 10px rgba(255,255, 255, 0.15)",
          "0 0px 30px rgba(255, 255,255, 0.1)"
        ],
        small: [
          "0 0px 10px rgba(255,255, 255, 0.1)",
          "0 0px 10px rgba(255, 255,255, 0.05)"
        ]
      },
      screens: {
        'xs': '500px',
        'mid': '900px',
        'mid2': '980px',
        '1080': '1080px'
      }
    },
  },
  plugins: [],
};
export default config;
