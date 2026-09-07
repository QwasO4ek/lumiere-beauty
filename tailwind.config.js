/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF9',
          100: '#FAF8F5', // основной фон
          200: '#F3EFEA',
          300: '#E8DED5', // приглушенный бежевый
          400: '#D6C7BA',
        },
        charcoal: {
          800: '#2D2825', // дополнительный темный
          900: '#24211F', // основной текст
        },
        terracotta: {
          300: '#D5A790',
          400: '#C79A81',
          500: '#B88C72', // акцентный цвет
          600: '#A2765D',
          700: '#865E47',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -5px rgba(36, 33, 31, 0.05), 0 5px 15px -3px rgba(36, 33, 31, 0.03)',
        'luxury-hover': '0 20px 40px -10px rgba(36, 33, 31, 0.09), 0 10px 20px -5px rgba(36, 33, 31, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
