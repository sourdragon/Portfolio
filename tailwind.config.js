/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        // Extend the default transition properties
        'top': 'top',
        'bottom': 'bottom',
        'left': 'left',
        'right': 'right',
      },
    },
  },
  plugins: [require("@catppuccin/tailwindcss")({
    prefix: "ctp",
    defaultFlavour : 'mocha'
  })],
}