module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          800: '#10172A',
          900: '#0B1020',
          950: '#060914',
        }
      },
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5", filter: "blur(40px)" },
          "50%": { opacity: "0.8", filter: "blur(60px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "slide-up": "slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "scale-in": "scale-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      transitionDuration: {
        400: "400ms",
      },
    },
  },
  plugins: [],
};
