/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#12161A',
          charcoal: '#1A2026',
          card: '#222A32',
          surface: '#2B3540',
          accent: '#E6A15C',       // Warm amber / saffron cafe tone
          accentHover: '#D38D46',
          gold: '#F4C582',
          cream: '#FDFBF7',
          muted: '#94A3B8',
          border: 'rgba(255, 255, 255, 0.08)'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
