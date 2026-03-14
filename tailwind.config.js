/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/posts/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/mdx/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Newsreader"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'Arial', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"SFMono-Regular"', 'monospace'],
      },
      colors: {
        site: {
          bg: '#faf8f3',
          surface: '#f3efe7',
          text: '#1d1d1b',
          muted: '#5f5a52',
          border: '#d9d2c7',
          accent: '#2f5d50',
          'accent-hover': '#254a40',
        },
      },
      maxWidth: {
        reading: '68ch',
        layout: '72rem',
      },
      borderRadius: {
        'soft': '1rem',
        'pill': '999px',
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(29, 29, 27, 0.06)',
      },
      letterSpacing: {
        tighterish: '-0.03em',
      },
    },
  },
  plugins: [],
}