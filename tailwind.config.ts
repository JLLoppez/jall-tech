import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1280px' }
    },
    extend: {
      colors: {
        midnight: '#0B1B33',
        'deep-navy': '#08152B',
        sky: '#3B82F6',
        gold: {
          DEFAULT: '#D4A017',
          50: '#FBF4E0',
          100: '#F3E1AE',
          600: '#B3830F'
        },
        'gray-light': '#F5F6F8',
        'gray-medium': '#8A93A3',
        'gray-dark': '#3C4353',
        success: '#15803D',
        danger: '#DC2626'
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif']
      },
      fontSize: {
        h1: ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h2: ['2rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        h3: ['1.375rem', { lineHeight: '1.3' }],
        h4: ['1.125rem', { lineHeight: '1.4' }]
      },
      boxShadow: {
        'gold-glow': '0 8px 24px -6px rgba(212, 160, 23, 0.45)'
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)'
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in-down': {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'scale-in': { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
        shimmer: { '0%': { backgroundPosition: '100% 0' }, '100%': { backgroundPosition: '0 0' } }
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
        'fade-in-down': 'fade-in-down 0.25s ease-out both',
        'scale-in': 'scale-in 0.25s ease-out both',
        shimmer: 'shimmer 1.5s infinite linear'
      }
    }
  },
  plugins: []
};

export default config;
