/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#0A2342',
        secondary: '#FFB347',
        dark: '#0A0A0A',
        card: '#1A1A1A',
        gold: '#FFB347',
        success: '#4CAF50',
        warning: '#FF9800',
        danger: '#F44336',
      },
    },
  },
  plugins: [],
}