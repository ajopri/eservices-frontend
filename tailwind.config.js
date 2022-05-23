module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        maha: {
          100: '#F9D4EB',
          200: '#F4ABDE',
          300: '#DE7BC9',
          400: '#BE54B0',
          500: '#93268F',
          600: '#791B7E',
          700: '#5D1369',
          800: '#440C55',
          900: '#320746',
        },
        'maha-green': {
          100: '#E6F7CD',
          200: '#C8F09F',
          300: '#98D368',
          400: '#65A73D',
          500: '#2E6D11',
          600: '#205D0C',
          700: '#154E08',
          800: '#0C3F05',
          900: '#053403',
        },
        content: '#FBF9FA',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
