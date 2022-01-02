module.exports = {
    content: ["./app/**/*.{ts,tsx}"],
    theme: {
      extend: {}
    },
    variants: {},
    plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography'),]
  };