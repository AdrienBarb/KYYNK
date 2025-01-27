/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
    './app-features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        karla: ['Karla', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
      },
      colors: {
        primary: '#cecaff',
        'primary-light': '#d9d7f6',
        secondary: '#fff0eb',
        'secondary-dark': '#FFE0D6',
        'custom-black': '#1c131e',
        destructive: 'red',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
