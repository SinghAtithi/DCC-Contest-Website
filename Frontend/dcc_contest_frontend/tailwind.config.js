/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    height :{
      '95.5%' : "95.5%"
    }
    
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["business"],
  },
  
}