type ToIntOptions = {
  min?: number;
  max?: number;
};

export function toInt(
  value: unknown,
  defaultValue: number,
  { min = 1, max = 100 }: ToIntOptions = {}
): number {
  const n = Number.parseInt(String(value), 10);

  if (Number.isNaN(n)) {
    return defaultValue;
  }

  return Math.min(max, Math.max(min, n));
}
