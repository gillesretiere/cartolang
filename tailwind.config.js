/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          ff_nexus_mix: ["ff-nexus-mix, sans-serif"],
          neue_haas_grotesk_display: ["neue-haas-grotesk-display, sans-serif"],
          articulat_cf: ["articulat-cf, sans-serif"],
          artifex_cf: ["artifex-cf, serif"],
          primary_font: ["articulat-cf, sans-serif"],
          secondary_font: ["artifex-cf, serif"],
        },
        colors: {
          'primary-main':'#f44336',
          'primary-orange': '#f44336',
          'primary-light': '#ef9a9a',
          'primary-dark': '#c62828',
          'primary-inverse': '#2dd0dc',
          'primary-complement': '#791cf8',
          'primary-contrastText': '#fff',
          'secondary-main':'#00D2E9',
          'secondary-light': '#abecf5',
          'secondary-dark': '#00aecb',
          'secondary-contrastText': '#00626a',        
          'analogous-main':'#f4a236',
          'analogous-light':'#fdf2e1',
          'analogous-dark':'#ed8720',
          'triadic-main':'#e7f436',
          'triadic-light':'#fdfee8',
          'triadic-dark':'#b6b21d',
          'regal-blue': '#243c5a',
          'primary-pink': 'rgb(255,96,134)',
          'primary-light-orange': 'rgb(249,92,56)',
          'primary-light-green': 'rgb(135,198,174)',
          'primary-pale-orange': '#BFB8AA',
          'sky-blue': ' #D2E8E3',
          'prussian-blue':'#5A878C',
          'primary-blue': '#8ed0f0',
          'primary-green': '#3AAE5A',
          "slate-gray": "#6D6D6D",
          "special-green": "#619257",
          "special-orange": "#F86740",
          "special-gris-clair": "rgb(246,244,239)",
        },
      },
    },
    plugins: [],
  }