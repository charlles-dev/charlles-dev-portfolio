/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#22ba9d",
        ink: "#111614",
        muted: "#5d6863",
        line: "#cbd7d0",
        dark: "#17201d",
        canvas: "#f8faf7"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Segoe UI", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "Consolas", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        soft: "0 24px 70px rgba(23, 32, 29, 0.12)"
      }
    }
  },
  plugins: []
};
