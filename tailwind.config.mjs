/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans:  ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
      colors: {
        parchment:      '#f5f4ed',
        ivory:          '#faf9f5',
        terracotta:     '#c96442',
        coral:          '#d97757',
        'near-black':   '#141413',
        'dark-surface': '#30302e',
        'charcoal-warm':'#4d4c48',
        'olive-gray':   '#5e5d59',
        'stone-gray':   '#87867f',
        'warm-silver':  '#b0aea5',
        'border-cream': '#f0eee6',
        'border-warm':  '#e8e6dc',
        'warm-sand':    '#e8e6dc',
      },
      maxWidth: {
        'content': '720px',
      },
      lineHeight: {
        'editorial': '1.60',
        'heading':   '1.20',
        'display':   '1.10',
      },
      boxShadow: {
        'ring-warm': '0px 0px 0px 1px #d1cfc5',
        'ring-sand': '0px 0px 0px 1px #e8e6dc',
        'ring-dark': '0px 0px 0px 1px #30302e',
        'whisper':   'rgba(0,0,0,0.05) 0px 4px 24px',
      },
    },
  },
  plugins: [],
}
