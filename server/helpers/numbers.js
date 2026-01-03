export const toInt = (v, def, { min = 1, max = 100 } = {}) => {
  const n = Number.parseInt(v, 10);
  if (Number.isNaN(n)) return def;
  return Math.min(max, Math.max(min, n));
};
