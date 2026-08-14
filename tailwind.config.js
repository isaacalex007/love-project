/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FBF3EC',
        ink: '#2E1F27',
        rose: '#D96C8A',
        wine: '#7A2E42',
        gold: '#C9A227',
        blush: '#F3D9DC',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Spectral', 'Georgia', 'serif'],
        stamp: ['"Special Elite"', '"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
}
