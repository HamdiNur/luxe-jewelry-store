/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        cream: "#F8F4EC",
        ivory: "#FFFDF8",
        ink: "#111111",
        gold: "#B8934A",
        "gold-light": "#D8BC7E",
        line: "#E7DFD0",
        muted: "#6F6A60",
      },
      fontFamily: {
        display: ["CormorantGaramond_500Medium"],
        "display-semibold": ["CormorantGaramond_600SemiBold"],
        "display-bold": ["CormorantGaramond_700Bold"],
        body: ["Inter_400Regular"],
        "body-medium": ["Inter_500Medium"],
        "body-semibold": ["Inter_600SemiBold"],
      },
    },
  },
  plugins: [],
};