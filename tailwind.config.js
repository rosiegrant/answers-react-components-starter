module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html', //optional if you want to add tailwind to your index.html page
    'node_modules/@yext/answers-react-components/lib/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--primary-color, #2563eb)',
        'primary-light': 'var(--primary-color-light, #dbeafe)',
        'primary-dark': 'var(--primary-color-dark, #dbeafe)',
        'neutral': 'var(--neutral-color, #4b5563)',
        'neutral-light': 'var(--neutral-color-light, #9ca3af)',
        'neutral-dark': 'var(--neutral-color-dark, #1f2937)'
      },
      borderRadius: {
        cta: 'var(--cta-border-radius, 1rem)'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    })
  ],
}
