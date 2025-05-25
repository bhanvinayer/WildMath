/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        wizard: {
          light: '#a78bfa', // purple
          dark: '#7c3aed',
        },
        archer: {
          light: '#34d399', // green
          dark: '#059669',
        },
        knight: {
          light: '#f97316', // orange
          dark: '#c2410c',
        },
        forest: {
          light: '#84cc16',
          dark: '#3f6212',
        },
        gorge: {
          light: '#ec4899',
          dark: '#9d174d',
        },
        desert: {
          light: '#f59e0b',
          dark: '#b45309',
        }
      },
      fontFamily: {
        display: ['Minecraft', 'serif'],
        body: ['Press Start 2P', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
};