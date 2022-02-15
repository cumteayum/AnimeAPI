module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      dropShadow: {
        default: '0 0 0 rgba(0, 0, 0, 0.1)',
        md: '0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
        lg: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.13)',
        xl: '0 15px 25px rgba(0, 0, 0, 0.22), 0 10px 10px #393E46',
      }
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif', 'Inter'],
    },
  },
  plugins: [],
}
