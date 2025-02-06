/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        calcScreen: "calc(100dvh - 5rem)",
      },
      minHeight: {
        calcScreen: "calc(100dvh - 5rem)",
      },
      width: {
        formContainer: "clamp(22rem, 50vw, 36rem)",
        cartWidth: "clamp(20rem, 85vw, 24rem)",
        inputWidth: "clamp(18rem, 80%, 28rem)",
        dashboard: "calc(100% - 12rem)",
      },
      colors: {
        baseColor: "#EE964B",
        // background: "#F7F7FF",
        background: "#FFF8F0",
      },
      fontSize: {
        cartButton: "clamp(0.75rem, calc(1vw + 5px), 1.3rem)",
      },
    },
  },
  plugins: [],
};
