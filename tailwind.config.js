/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand blues. `ink`, `sky` and `mist` are theme-aware (CSS variables)
        // so the same classes adapt between dark and light; `navy/royal/azure`
        // stay fixed for the logo mark and decorative gradients.
        nova: {
          ink: "rgb(var(--bg) / <alpha-value>)", // theme page base
          abyss: "#0A0F22",
          navy: "#09238A", // deepest brand navy (fixed)
          royal: "#2D5DA9", // fixed
          azure: "#3A74CC", // fixed
          sky: "rgb(var(--accent) / <alpha-value>)", // theme accent
          mist: "rgb(var(--mist) / <alpha-value>)", // theme secondary text
        },
        ink: {
          // Fixed dark — used as text on the light-blue primary surfaces.
          900: "#060912",
          800: "#0A0F20",
          700: "#0E1428",
        },
        paper: "rgb(var(--fg) / <alpha-value>)", // theme foreground/text
      },
      fontFamily: {
        display: ['"Sora"', "system-ui", "sans-serif"],
        grotesk: ['"Space Grotesk"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.22em",
      },
      maxWidth: {
        shell: "1240px",
      },
      borderRadius: {
        slab: "28px",
      },
      boxShadow: {
        slab: "0 40px 120px -40px rgba(4, 10, 30, 0.85)",
        rise: "0 -30px 80px -50px rgba(104, 161, 235, 0.4)",
      },
      transitionTimingFunction: {
        nova: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "sheen": {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        sheen: "sheen 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
        "float-slow": "float-slow 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
