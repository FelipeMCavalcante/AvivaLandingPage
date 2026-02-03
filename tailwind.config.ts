import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'aviva-blue': '#3871fe',
      },
      fontFamily: {
        neueBold: ['var(--font-neueMachinaBold)'],
        neueLight: ['var(--font-neueMachinaLight)'],
      },
      animation: {
        wave: 'wave-text 3s infinite linear',
      },
      keyframes: {
        'wave-text': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
