/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customBlue: '#1a73e8',
      },
    },
  },
  plugins: [require('daisyui')],
};