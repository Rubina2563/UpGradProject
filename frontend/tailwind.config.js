/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"], // Primary sans-serif font
      heading: ["Poppins", "sans-serif"], // Font for headings
    },
    extend: {
      screens: {
        sm: "400px", // Small screens (mobile devices)
        md: "800px", // Medium screens (tablets)
        lg: "1050px", // Large screens (small laptops)
        xl: "1110px", // Extra large screens (large laptops/desktops)
        "2xl": "1300px", // Double extra large screens (large desktops)
        "3xl": "1450px",
      },
    },
  },
  plugins: [],
};
