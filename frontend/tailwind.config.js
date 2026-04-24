/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'nivis-black': '#0a0a0a',
        'nivis-gray': '#262626',
        'nivis-light-gray': '#333333',
        'nivis-neon': '#d4ff3c', // El verde lima/neon de la captura
        'nivis-white': '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
