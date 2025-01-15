/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        screen: "calc(100dvh - 4rem)",
      },
      width: {
        formContainer: "clamp(22rem, 50vw, 36rem)",
      },
      colors: {
        baseColor: "#EE964B",
      },
    },
  },
  plugins: [],
};
