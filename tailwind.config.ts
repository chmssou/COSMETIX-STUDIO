/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
background: '#FFFFFF',
        surface: '#F8F9FA',
        primary: '#FFFFFF',
        secondary: '#A1A7B3',
accent: {
          DEFAULT: '#A94867',
          blush: '#F6E3E8',
          dark: '#8B3D52',
        },
        blush: {
          DEFAULT: '#F6E3E8',
          light: '#F8EDF2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'power3': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
