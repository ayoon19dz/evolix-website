/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        brand: {
          DEFAULT: '#7c3aed',
          dark:    '#5b21b6',
          light:   '#a78bfa',
        },
        accent: {
          cyan:   '#06b6d4',
          indigo: '#6366f1',
          green:  '#10b981',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        'aurora-gradient': 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #a78bfa 100%)',
        'brand-gradient':  'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
        'cyan-gradient':   'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
      },
      animation: {
        'aurora':       'aurora-drift-1 12s ease-in-out infinite alternate',
        'glow-pulse':   'glow-pulse 3s ease-in-out infinite',
        'float':        'float 6s ease-in-out infinite',
        'spin-slow':    'spin 20s linear infinite',
        'fade-in-up':   'fade-in-up 0.6s ease-out forwards',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'brand':     '0 0 30px rgba(124, 58, 237, 0.3)',
        'brand-lg':  '0 0 60px rgba(124, 58, 237, 0.25), 0 0 120px rgba(124, 58, 237, 0.1)',
        'glass':     '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        'card-hover':'0 20px 60px rgba(124, 58, 237, 0.2)',
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
}
