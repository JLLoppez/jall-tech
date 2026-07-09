import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1200px' }
    },
    extend: {
      colors: {
        midnight: '#0B2346',
        'deep-navy': '#102A56',
        gold: {
          DEFAULT: '#D4A017',
          50: '#FFFBEB',
          100: '#FDF0D5',
          600: '#B8860F'
        },
        sky: '#2563EB',
        'gray-light': '#F5F7FA',
        'gray-medium': '#687280',
        'gray-dark': '#1F2937',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#2563EB'
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'Segoe UI', 'Arial', 'sans-serif'],
        body: ['var(--font-inter)', 'Segoe UI', 'Arial', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'Courier New', 'monospace']
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px'
      },
      boxShadow: {
        sm: '0 1px 3px rgba(11, 35, 70, 0.06)',
        md: '0 4px 12px rgba(11, 35, 70, 0.08)',
        lg: '0 10px 25px rgba(11, 35, 70, 0.10)',
        xl: '0 20px 45px rgba(11, 35, 70, 0.14)'
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem'
      },
      maxWidth: {
        container: '1200px'
      }
    }
  },
  plugins: []
};

export default config;
