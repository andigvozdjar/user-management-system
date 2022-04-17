module.exports = {
  mode: 'jit',
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss'), require('autoprefixer')],
  content: ['./src/**/*.{html,ts}']
}
