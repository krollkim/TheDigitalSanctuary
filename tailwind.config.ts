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
        // Every token resolves through a CSS variable holding space-separated
        // RGB channels, so `html.a11y-high-contrast` can swap the whole palette
        // at the source. The `<alpha-value>` placeholder keeps Tailwind's
        // opacity modifiers (`text-sanctuary-beige/60`) working.
        // Literal hex values live in globals.css :root — see that file.
        sanctuary: {
          // ── Surfaces ────────────────────────────────────────────────
          // The calm of the palette lives here. Unchanged from the original.
          'off-white': 'rgb(var(--c-off-white) / <alpha-value>)',
          beige: 'rgb(var(--c-beige) / <alpha-value>)',
          warm: 'rgb(var(--c-warm) / <alpha-value>)',
          'brown-faint': 'rgb(var(--c-brown-faint) / <alpha-value>)',
          brown: 'rgb(var(--c-brown) / <alpha-value>)',

          // ── Accents (surface-only) ──────────────────────────────────
          // Too light to carry text. Tinted fills / blurs / rules only,
          // never `text-*`. For sage-as-ink use `sage-deep`.
          sage: 'rgb(var(--c-sage) / <alpha-value>)',
          'sage-light': 'rgb(var(--c-sage-light) / <alpha-value>)',
          'sage-mid': 'rgb(var(--c-sage-mid) / <alpha-value>)',
          clay: 'rgb(var(--c-clay) / <alpha-value>)',
          'clay-mid': 'rgb(var(--c-clay-mid) / <alpha-value>)',

          // ── Action ──────────────────────────────────────────────────
          // Named by role. Use at full strength for controls, at low alpha
          // (/10–/25) for the decorative work that echoes them.
          action: 'rgb(var(--c-action) / <alpha-value>)',
          'action-hover': 'rgb(var(--c-action-hover) / <alpha-value>)',

          // ── Ink ─────────────────────────────────────────────────────
          // Every value clears WCAG AA (4.5:1) on off-white, beige, warm
          // and white. Deepened, not recoloured — the hues are unchanged.
          'sage-deep': 'rgb(var(--c-sage-deep) / <alpha-value>)',
          'sage-btn': 'rgb(var(--c-sage-btn) / <alpha-value>)',
          'sage-dark': 'rgb(var(--c-sage-dark) / <alpha-value>)',
          'brown-mid': 'rgb(var(--c-brown-mid) / <alpha-value>)',
          'brown-light': 'rgb(var(--c-brown-light) / <alpha-value>)',
        },
      },
      fontFamily: {
        serif: ['var(--font-noto-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-assistant)', 'system-ui', 'sans-serif'],
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
