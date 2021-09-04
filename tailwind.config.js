module.exports = {
  purge: [],
  purge: ["./src/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": {
            transform: "rotate(0deg)",
            transform: "scale(1)",
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "rotate(10deg)",
            transform: "scale(1.5)",
            transform: "translateY(10px)",
          },
        },
      },

      height: {
        fit: "fit-content",
        "fit-screen": "79%",
      },
      animation: {
        "spin-slow": "ping 1s cubic-bezier(0, 0, 0.2, 1) 1;",
        wiggle: "wiggle 1s ease-in-out infinite;",
      },
      keyframes: {
        "spin-slow": {
          "0%": { opacity: 1 },
          "50%": { opacity: 0.5 },
          "100%": { opacity: 0 },
        },
      },
    },
  },
  variants: {
    extend: {
      animation: ["hover", "focus", "active"],
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [],
};
