/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
  ],
  theme: {
    screens: {
      desktop: "1440px",
    },
    extend: {
      colors: {
        "pale-gray": "#E5E7EB",
        "light-gray": "#D1D5DB",
      },
    },
  },
  plugins: [],
};
