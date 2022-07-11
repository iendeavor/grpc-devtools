module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "-theme-with-dark-background",
  theme: {
    colors: {},
    extend: {
      colors: {
        primary: "rgb(138 180 248)",
        "primary-variant": "rgb(102 157 246)",

        "text-error": "hsl(0deg 100% 75%)",

        "text-primary": "rgb(232 234 237)",
        "text-secondary": "rgb(154 160 166)",

        "primary-border": "#FFFFFF1A",
        "secondary-border": "#5F6368",

        background: "rgb(32 33 36)",
        "background-inverted": "rgb(255 255 255)",
        "background-elevation-0": "rgb(32 32 35)",
        "background-elevation-1": "rgb(41 42 45)",
        "background-elevation-2": "rgb(53 54 58)",
      },
    },
  },
  plugins: [],
};
