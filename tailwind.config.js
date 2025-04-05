/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#2563eb',
            dark: '#1d4ed8',
          },
          secondary: '#4f46e5',
          accent: '#06b6d4',
        },
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
        },
        animation: {
          'float': 'float 3s ease-in-out infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
        },
        boxShadow: {
          'glow': '0 0 15px -3px rgba(37, 99, 235, 0.1)',
        },
      },
    },
    plugins: [],
  }