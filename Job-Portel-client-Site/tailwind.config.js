/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customBlue: '#1a73e8',
      },
      boxShadow: {
        custom: '0px 3px 8px rgba(0, 0, 0, 0.24)',
      },
      animation: {
        rotate: 'rotate 1s infinite',
        ball1: 'ball1 1s infinite',
        ball2: 'ball2 1s infinite',
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg) scale(0.8)' },
          '50%': { transform: 'rotate(360deg) scale(1.2)' },
          '100%': { transform: 'rotate(720deg) scale(0.8)' },
        },
        ball1: {
          '0%': { boxShadow: '30px 0 0 #ff3d00' },
          '50%': {
            boxShadow: '0 0 0 #ff3d00',
            marginBottom: '0',
            transform: 'translate(15px, 15px)',
          },
          '100%': { boxShadow: '30px 0 0 #ff3d00', marginBottom: '10px' },
        },
        ball2: {
          '0%': { boxShadow: '30px 0 0 #fff' },
          '50%': {
            boxShadow: '0 0 0 #fff',
            marginTop: '-20px',
            transform: 'translate(15px, 15px)',
          },
          '100%': { boxShadow: '30px 0 0 #fff', marginTop: '0' },
        },
      },
    },
  },
  plugins: [require('daisyui')],
};
