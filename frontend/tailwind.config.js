import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        roboto: ['"Roboto"', 'sans-serif'],
      },
      fontWeight: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
      },
      colors: {
        gold: {
          dark: '#6B5A38',
          DEFAULT: '#967F50',
          light: '#A68D59',
          extralight: '#BDA575',
          thin: '#EAE5DC'
        },
        gray: {
          dark: '#34312C',
          medium: '#413D37',
          DEFAULT: '#666563',
          light: '#A5A5A5',
          extralight: '#F2F2F2'

        }
      },
    },
  },
  plugins: [
    aspectRatio,
  ],
}

