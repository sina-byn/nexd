import type { Config } from 'tailwindcss';

// * plugins
import twTypography from '@tailwindcss/typography';

export default {
  darkMode: 'class',
  content: [
    './core/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background))',
        foreground: { DEFAULT: 'rgb(var(--foreground))', light: 'rgb(var(--foreground-light))' },

        primary: 'rgb(var(--primary))',
        
        neutral: {
          DEFAULT: 'rgb(var(--neutral))',
          dark: 'rgb(var(--neutral-dark))',
          light: 'rgb(var(--neutral-light))',
          lighter: 'rgb(var(--neutral-lighter))',
        },

        note: {
          DEFAULT: 'rgb(var(--note))',
          dark: 'rgb(var(--note-dark))',
          light: 'rgb(var(--note-light))',
        },
        tip: {
          DEFAULT: 'rgb(var(--tip))',
          dark: 'rgb(var(--tip-dark))',
          light: 'rgb(var(--tip-light))',
        },
        info: {
          DEFAULT: 'rgb(var(--info))',
          dark: 'rgb(var(--info-dark))',
          light: 'rgb(var(--info-light))',
        },
        warning: {
          DEFAULT: 'rgb(var(--warning))',
          dark: 'rgb(var(--warning-dark))',
          light: 'rgb(var(--warning-light))',
        },
        danger: {
          DEFAULT: 'rgb(var(--danger))',
          dark: 'rgb(var(--danger-dark))',
          light: 'rgb(var(--danger-light))',
        },
      },
    },
  },
  plugins: [twTypography],
} satisfies Config;
