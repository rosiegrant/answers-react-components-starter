module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html', //optional if you want to add tailwind to your index.html page
    'node_modules/@yext/answers-react-components/lib/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2563eb',
        'primary-light': '#dbeafe',
        'primary-dark': '#dbeafe',
        'neutral': '#4b5563',
        'neutral-light': '#9ca3af',
        'neutral-dark': '#1f2937'
      },
      borderRadius: {
        cta: '1rem'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    })
  ],
}
