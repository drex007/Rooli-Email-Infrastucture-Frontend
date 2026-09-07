import tailwindcssMotion from "tailwindcss-motion";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mn': '900px',
      // => @media (min-width: 900px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '1930px',
      // => @media (min-width: 1536px) { ... }
      '4xl': '2560px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-radial-to-t': 'radial-gradient(circle_at_top_left,(var(--tw-gradient-stops))',


      },

      colors: {
        "primary-yellow": '#E7FB05',
        "primary-teal": '#E9EBF8',
        "button-blue": '#194FFF ',
        "primary-card": "#0E0949",
        "primary-bg-blend": '#BDDBFB',
        "primary-text-color": "#2E3449",
        "primary-black-text": "#3D3D3D",
        "modal-bg": "#11111190",
        "base-blue":"#3A80FE",
        "faq-bg":"#F3F3F3",
        // "faq-bg-dark": "#000000"
        "faq-bg-dark": "#032a89"


      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        // spacegrotesk: ["Space Grotesk", "sans-serif"],
        spacegrotesk: ["Poppins", "sans-serif"],
        Montserrat: ["Montserrat"],
        Orbitron: ["Orbitron"],
        irish: ["Irish Grover"],
        milky: "Milky",
        african: "Orbitron"

      },
    },
  },
  plugins: [tailwindcssMotion],
}
