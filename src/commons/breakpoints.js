// Source: https://dev.to/cagatayunal/how-to-use-css-media-query-breakpoint-in-styled-components-9of
const size = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};
const device = {
  sm: `@media (min-width: ${size.sm})`,
  md: `@media (min-width: ${size.md})`,
  lg: `@media (min-width: ${size.lg})`,
  xl: `@media (min-width: ${size.xl})`,
  "2xl": `@media (min-width: ${size["2xl"]})`,
};
export default { size, device };
