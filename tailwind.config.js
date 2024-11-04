/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /(top|left)-([0-9]+)/,
    },
  ],
  plugins: [],
};
