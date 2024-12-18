import { nextui } from '@nextui-org/react';
import tailwindcssAnimate from 'tailwindcss-animate';
import debugScreens from 'tailwindcss-debug-screens';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
      debugScreens: {
        position: ['bottom', 'left'],
      },
    },
    extend: {
      fontFamily: {
        sans: ['Lexend', 'Inter', ...defaultTheme.fontFamily.sans],
        display: ['Lexend', ...defaultTheme.fontFamily.sans],
      },
      width:{
        "4.5": "1.125rem",
      },
      height:{
        "4.5": "1.125rem",
      },
      fontSize:{
        "2xs": "0.7rem",
        "xs": "0.7375rem",
        "sm": "0.8125rem",
        "base": "0.875rem",
        "lg": "1rem",
        "xl": "1.125rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "1.875rem",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    debugScreens,
    nextui({
      layout: {
        radius: {
          small: "2px",
          normal: "4px",
          medium: "6px",
          large: "8px",
        }
      },
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            overlay: colors.slate[600],
            primary: {
              DEFAULT: colors.emerald[500],
              "50": colors.emerald[50],
              "100": colors.emerald[100],
              "200": colors.emerald[200],
              "300": colors.emerald[300],
              "400": colors.emerald[400],
              "500": colors.emerald[500],
              "600": colors.emerald[600],
              "700": colors.emerald[700],
              "800": colors.emerald[800],
              "900": colors.emerald[900],
              "950": colors.emerald[950],
              foreground: colors.white,
            },
            danger: {
              DEFAULT: colors.rose[500],
              "50": colors.rose[50],
              "100": colors.rose[100],
              "200": colors.rose[200],
              "300": colors.rose[300],
              "400": colors.rose[400],
              "500": colors.rose[500],
              "600": colors.rose[600],
              "700": colors.rose[700],
              "800": colors.rose[800],
              "900": colors.rose[900],
              "950": colors.rose[950],
              foreground: colors.white,
            },
            secondary: {
              DEFAULT: colors.cyan[400],
              "50": colors.cyan[50],
              "100": colors.cyan[100],
              "200": colors.cyan[200],
              "300": colors.cyan[300],
              "400": colors.cyan[400],
              "500": colors.cyan[500],
              "600": colors.cyan[600],
              "700": colors.cyan[700],
              "800": colors.cyan[800],
              "900": colors.cyan[900],
              "950": colors.cyan[950],
              foreground: colors.cyan[900],
            },
            warning: {
              DEFAULT: colors.amber[400],
              "50": colors.amber[50],
              "100": colors.amber[100],
              "200": colors.amber[200],
              "300": colors.amber[300],
              "400": colors.amber[400],
              "500": colors.amber[500],
              "600": colors.amber[600],
              "700": colors.amber[700],
              "800": colors.amber[800],
              "900": colors.amber[900],
              "950": colors.amber[950],
              foreground: colors.amber[900],
            },
            success:{
              DEFAULT: "#1CAF57",
              "100": "#D0FBD0",
              "200": "#A4F7AC",
              "300": "#72E78A",
              "400": "#4CCF73",
              "500": "#1CAF57",
              "600": "#149655",
              "700": "#0E7D51",
              "800": "#086549",
              "900": "#055344",
            },
            // default:{}
            focus: colors.emerald[600],
          },
        },
        dark: {
          extend: "dark",
          layout: {
          },
          colors: {
            background: colors.slate[900],
            primary: {
              DEFAULT: colors.emerald[500],
              "50": colors.emerald[50],
              "100": colors.emerald[100],
              "200": colors.emerald[200],
              "300": colors.emerald[300],
              "400": colors.emerald[400],
              "500": colors.emerald[500],
              "600": colors.emerald[600],
              "700": colors.emerald[700],
              "800": colors.emerald[800],
              "900": colors.emerald[900],
              "950": colors.emerald[950],
              foreground: colors.white,
            },
            danger: {
              DEFAULT: colors.rose[500],
              "50": colors.rose[50],
              "100": colors.rose[100],
              "200": colors.rose[200],
              "300": colors.rose[300],
              "400": colors.rose[400],
              "500": colors.rose[500],
              "600": colors.rose[600],
              "700": colors.rose[700],
              "800": colors.rose[800],
              "900": colors.rose[900],
              "950": colors.rose[950],
              foreground: colors.white,
            },
            secondary: {
              DEFAULT: colors.cyan[400],
              "50": colors.cyan[50],
              "100": colors.cyan[100],
              "200": colors.cyan[200],
              "300": colors.cyan[300],
              "400": colors.cyan[400],
              "500": colors.cyan[500],
              "600": colors.cyan[600],
              "700": colors.cyan[700],
              "800": colors.cyan[800],
              "900": colors.cyan[900],
              "950": colors.cyan[950],
              foreground: colors.cyan[900],
            },
            warning: {
              DEFAULT: colors.amber[400],
              "50": colors.amber[50],
              "100": colors.amber[100],
              "200": colors.amber[200],
              "300": colors.amber[300],
              "400": colors.amber[400],
              "500": colors.amber[500],
              "600": colors.amber[600],
              "700": colors.amber[700],
              "800": colors.amber[800],
              "900": colors.amber[900],
              "950": colors.amber[950],
              foreground: colors.amber[900],
            },
            default: {
              DEFAULT: colors.slate[400],
              "50": colors.slate[50],
              "100": colors.slate[100],
              "200": colors.slate[200],
              "300": colors.slate[300],
              "400": colors.slate[400],
              "500": colors.slate[500],
              "600": colors.slate[600],
              "700": colors.slate[700],
              "800": colors.slate[800],
              "900": colors.slate[900],
              "950": colors.slate[950],
              foreground: colors.slate[50],
            },
            success:{
              DEFAULT: "#1CAF57",
              "100": "#D0FBD0",
              "200": "#A4F7AC",
              "300": "#72E78A",
              "400": "#4CCF73",
              "500": "#1CAF57",
              "600": "#149655",
              "700": "#0E7D51",
              "800": "#086549",
              "900": "#055344",
            },
            // default:{}
            focus: colors.emerald[600],
          },
        },
      }
    })
  ],
}