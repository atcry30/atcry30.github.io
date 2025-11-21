/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fff9e6',
          100: '#ffeecc',
          200: '#ffdfa3',
          300: '#ffd079',
          400: '#ffc150',
          500: '#d4af37', // classic gold tone
          600: '#b3922e',
          700: '#927525',
          800: '#70581b',
          900: '#4f3c12',
        },
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(0,0,0,0.25)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


