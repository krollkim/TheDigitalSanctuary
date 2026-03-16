import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sanctuary: {
          'off-white': '#FAFAF7',
          beige: '#F5F5DC',
          warm: '#EDE8D0',
          sage: '#B2AC88',
          'sage-light': '#D4D4B8',
          'sage-mid': '#C8C4A0',
          'sage-dark': '#8A8668',
          clay: '#C4A882',
          brown: '#3D3530',
          'brown-mid': '#6B5D55',
          'brown-light': '#9A8A80',
          'brown-faint': '#F0EBE5',
        },
      },
      fontFamily: {
        serif: ['var(--font-frank-ruhl)', 'Georgia', 'serif'],
        sans: ['var(--font-heebo)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1.05' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        breathe: 'breathe 5s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.06)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
      },
      boxShadow: {
        'sanctuary': '0 2px 20px rgba(61, 53, 48, 0.06)',
        'sanctuary-md': '0 4px 32px rgba(61, 53, 48, 0.09)',
        'sanctuary-lg': '0 8px 48px rgba(61, 53, 48, 0.12)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionTimingFunction: {
        'sanctuary': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
