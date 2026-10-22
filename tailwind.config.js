/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noor: {
          warm: "#FFFAF5", // Exact master brief warm cream
          card: "#FFFFFF",
          amber: {
            50: "#FFFBEB",
            100: "#FEF3C7",
            200: "#FDE68A",
            500: "#F59E0B",
            600: "#D97706",
          },
          saffron: {
            50: "#FFF7ED",
            100: "#FFEDD5",
            200: "#FED7AA",
            500: "#F97316",
            600: "#EA580C",
            700: "#C2410C",
          },
          emerald: {
            DEFAULT: "#278365", // Exact master brief positive green
            50: "#F0FDF8",
            100: "#D1FAE5",
            600: "#278365",
            700: "#1E6850",
          },
          charcoal: {
            900: "#1C1917",
            800: "#292524",
            700: "#44403C",
            600: "#57534E",
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        devanagari: ['"Noto Sans Devanagari"', 'sans-serif'],
      },
      fontSize: {
        'senior-base': ['1.25rem', { lineHeight: '1.75rem' }],
        'senior-lg': ['1.375rem', { lineHeight: '1.875rem' }],
        'senior-xl': ['1.625rem', { lineHeight: '2.125rem' }],
      },
      minHeight: {
        'touch-senior': '56px',
      }
    },
  },
  plugins: [],
}
