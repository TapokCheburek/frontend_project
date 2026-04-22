/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: ['class', '[data-theme="dark"]'],
    theme: {
        extend: {
            colors: {
                brand: {
                    bg: 'rgb(var(--bg-primary-rgb) / <alpha-value>)',
                    surface: 'rgb(var(--bg-surface-rgb) / <alpha-value>)',
                    text: 'rgb(var(--text-primary-rgb) / <alpha-value>)',
                    'text-dim': 'rgb(var(--text-secondary-rgb) / <alpha-value>)',
                    border: 'rgb(var(--border-color-rgb) / <alpha-value>)',
                    primary: 'rgb(var(--primary-color-rgb) / <alpha-value>)',
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
