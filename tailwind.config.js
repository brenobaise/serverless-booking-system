/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    ".src/components/**/*.{js,ts,jsx,tsx}", // For components directory
    "./src/app/**/*.{js,ts,jsx,tsx}", // For app directory (Next.js App Router)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
