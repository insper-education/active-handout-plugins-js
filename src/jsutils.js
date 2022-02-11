export function isNullOrUndefined(v) {
  return v === null || typeof v === "undefined";
}

export function maxDateString(d1, d2) {
  if (!d1) return d2;
  if (!d2) return d1;
  if (d1 > d2) return d1;
  return d2;
}
