import type { Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
  darkMode: ['class'],
  theme: {
    extend: {
      fontFamily: {
        karla: ['Karla', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
      },
      colors: {
        primary: '#cecaff',
        'primary-light': '#d9d7f6',
        'primary-dark': '#B4ADFF',
        secondary: '#fff0eb',
        'secondary-dark': '#FFE8E0',
        'custom-black': '#1c131e',
        destructive: 'red',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
