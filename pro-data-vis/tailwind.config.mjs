/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        slideUp: {
          '0%': { transform: "translateY(0%)"},
          '100%': { transform: "translateY(-100%)" },
        }
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true, preferredStrategy: "pseudoelements" }),
  ],
};
