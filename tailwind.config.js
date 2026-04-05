/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(139, 92, 246, 0.35)',
        card: '0 4px 24px -4px rgba(15, 23, 42, 0.08), 0 8px 32px -8px rgba(139, 92, 246, 0.12)',
        'card-dark': '0 4px 24px -4px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(139, 92, 246, 0.12)',
      },
    },
  },
  plugins: [],
}

