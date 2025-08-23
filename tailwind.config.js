/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#030014",
        secondary: "#334155",
        accent: "#AB8BFF",
        light: {
          100: "D6C6FF",
          200: "#A8B5DB",
          300: "#9CA4AB",
        },
        dark: {
          100: "#221f3d",
          200: "#0f0d23"
        },
        red: "#2f0000",
        gray: "#272727",
        lightGray: "#999",
        placeholderColor: "#a8b5db"
      }
    },
  },
  plugins: [],
}