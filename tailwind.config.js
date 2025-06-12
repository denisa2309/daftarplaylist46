/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Kumbh Sans'],
        main: ['Kumbh Sans'],
      },
      colors: {
        pink: '#e46ab3',
      },
    },
  },
  plugins: [],
};
