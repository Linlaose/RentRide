/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,html}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1320px',
      '3xl': '1536px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        '2xl': '0.75rem',
      },
    },
    extend: {
      width: {
        18: '4.5rem',
        49: '12.25rem',
      },
      height: {
        '2px': '2px',
      },
      spacing: {
        15: '3.75rem',
        '55%': '55%',
      },
      fontSize: {
        '6px': '0.375rem',
        '32px': '2rem',
        '42px': '2.625rem',
        '66px': '4.125rem',
      },
      colors: {
        'smoke-dark': '#0D0D0D',
        'light-gray': '#D9D9D9',
        'light-black': '#1C1C1E',
        'light-purple': '#4636AB',
        'light-white': '#F2F2F2',
        'dark-gray': '#808080',
        'blue-gray': '#96C6D9',
        'orange-pink': '#F26E50',
      },
      boxShadow: {
        'shop-card': '0 0 10px 6px #96C6D9',
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'scale-title': 'scale 3s linear infinite',
      },
      keyframes: {
        scale: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
      },
      transitionProperty: {
        width: 'width',
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#4636AB',
          'primary-content': '#f2f2f2',
          'base-100': '#F2F2F2',
        },
      },
    ],
  },
};
