/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      'light'
    ],
  },
  plugins: [require("daisyui")],
}
