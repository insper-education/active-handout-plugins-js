import breakpoints from "./breakpoints";

function calcRemSize(size) {
  return `${size * 0.25}rem`;
}

function calcPctSize(size) {
  return `${size * 100}%`;
}

export default {
  border: {
    0: "0px",
    2: "2px",
    4: "4px",
    8: "8px",
    base: "1px",
  },
  borderRadius: {
    none: "0px",
    sm: "0.125rem",
    rounded: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
  boxShadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    default: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    none: "0 0 #0000",
  },
  colors: {
    // Colors from TailwindCSS: https://tailwindcss.com/docs/customizing-colors
    primary: {
      default: "#27A5A2",
      50: "#e9f6f6",
      100: "#bee4e3",
      200: "#93d2d1",
      300: "#68c0be",
      400: "#3daeab",
      500: "#239592",
      600: "#1b7371",
      700: "#145351",
      800: "#0c3131",
      900: "#041010",
    },
    secondary: {
      default: "#F58220",
      50: "#fef3e9",
      100: "#fcdabc",
      200: "#fac190",
      300: "#f8a863",
      400: "#f68f36",
      500: "#dd751d",
      600: "#ac5b16",
      700: "#7b4110",
      800: "#49270a",
      900: "#180d03",
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
    green: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
    },
    red: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
    },
    yellow: {
      50: "#fefce8",
      100: "#fef9c3",
      200: "#fef08a",
      300: "#fde047",
      400: "#facc15",
      500: "#eab308",
      600: "#ca8a04",
      700: "#a16207",
      800: "#854d0e",
      900: "#713f12",
    },
  },
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  grid: {
    column: {
      auto: "auto",
      span: (colspan) =>
        colspan === "full" ? "1 / -1" : `span ${colspan} / span ${colspan}`,
    },
  },
  height: { 0: "0px", px: "1px", rem: calcRemSize, pct: calcPctSize },
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  lineHeight: {
    rem: calcRemSize,
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
  margin: { 0: "0px", px: "1px", rem: calcRemSize },
  maxWidth: {
    0: "0rem",
    none: "none",
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",
    "7xl": "80rem",
    full: "100%",
    min: "min-content",
    max: "max-content",
    fit: "fit-content",
    prose: "65ch",
    "screen-sm": breakpoints.size.sm,
    "screen-md": breakpoints.size.md,
    "screen-lg": breakpoints.size.lg,
    "screen-xl": breakpoints.size.xl,
    "screen-2xl": breakpoints.size["2xl"],
  },
  outline: {
    none: "outline: 2px solid transparent; outline-offset: 2px",
    base: "outline-style: solid",
    dashed: "outline-style: dashed",
    dotted: "outline-style: dotted",
    double: "outline-style: double",
    hidden: "outline-style: hidden",
  },
  padding: { 0: "0px", px: "1px", rem: calcRemSize },
  text: {
    xs: "font-size: 0.75rem; line-height: 1rem",
    sm: "font-size: 0.875rem; line-height: 1.25rem",
    base: "font-size: 1rem; line-height: 1.5rem",
    lg: "font-size: 1.125rem; line-height: 1.75rem",
    xl: "font-size: 1.25rem; line-height: 1.75rem",
    "2xl": "font-size: 1.5rem; line-height: 2rem",
    "3xl": "font-size: 1.875rem; line-height: 2.25rem",
    "4xl": "font-size: 2.25rem; line-height: 2.5rem",
    "5xl": "font-size: 3rem; line-height: 1",
    "6xl": "font-size: 3.75rem; line-height: 1",
    "7xl": "font-size: 4.5rem; line-height: 1",
    "8xl": "font-size: 6rem; line-height: 1",
    "9xl": "font-size: 8rem; line-height: 1",
  },
};
