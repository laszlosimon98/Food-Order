/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        calcScreen: "calc(100dvh - 5rem)",
      },
      width: {
        formContainer: "clamp(22rem, 50vw, 36rem)",
        cartWidth: "clamp(20rem, 50vw, 30rem)",
      },
      colors: {
        baseColor: "#EE964B",
        // background: "#F0EDEE",
        // background: "#FBFEF9",
        background: "#F7F7FF",
      },
      fontSize: {
        cartButton: "clamp(0.75rem, calc(1vw + 5px), 1.3rem)",
      },
    },
  },
  plugins: [],
};
