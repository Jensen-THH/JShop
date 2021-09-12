console.log('runing ', process.env.TAILWIND_MODE);
module.exports = {
    // prefix: 'jit',
    mode:'jit',
    purge: {
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    // plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography')],
    plugins: [
    ],
};