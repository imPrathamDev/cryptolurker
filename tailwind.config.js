module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(20px, -40px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-10px, 10px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
      },
      fontFamily: {
        'noto': ['"Noto Sans"','sans-serif'],
      },
      colors: {
        'new-black': '#212121',
        'app-white': '#FAFAFA',
        'app-green': '#5CE1E6',
        'app-purple': '#9D6CFF',
        'app-pink': '#FF487A',
        'app-gray': '#737373',
        'app-light-gray': '#D9D9D9',
        'dark-blue': '#220660',
        'app-chart-green': '#32CD32',
        'app-chart-red': '#EE4B2B',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}