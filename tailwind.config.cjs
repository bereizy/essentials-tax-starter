/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}",
    "./node_modules/@indirecttek/essentials-engine/dist/**/*.{astro,html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1f2937",
        secondary: "#0f766e",
        accent: "#fbbf24",
        background: "#f9fafb",
        foreground: "#111827",
      },
    },
  },
  plugins: [],
};
