export const findAncestorByClass = (node, className) => {
  if (!node) return null;
  if (node.classList.contains(className)) return node;
  return findAncestorByClass(node.parentNode, className);
};

const approx = (n1, n2, epsilon) => {
  return Math.abs(n1 - n2) <= epsilon;
};

export const samePositionAndSize = (el1, el2, tolerance) => {
  if (!tolerance) tolerance = 5;
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();
  const root1 = findAncestorByClass(
    el1,
    "preview-container"
  ).getBoundingClientRect();
  const root2 = findAncestorByClass(
    el2,
    "preview-container"
  ).getBoundingClientRect();
  const x1 = rect1.x - root1.x;
  const y1 = rect1.y - root1.y;
  const x2 = rect2.x - root2.x;
  const y2 = rect2.y - root2.y;
  const w1 = rect1.width;
  const h1 = rect1.height;
  const w2 = rect2.width;
  const h2 = rect2.height;
  return (
    approx(x1, x2, tolerance) &&
    approx(y1, y2, tolerance) &&
    approx(w1, w2, tolerance) &&
    approx(h1, h2, tolerance)
  );
};
