export const CATEGORIES = new Set<string>([
  'general',
  'world',
  'nation',
  'business',
  'technology',
  'entertainment',
  'sports',
  'science',
  'health',
]);

export type Category = typeof CATEGORIES extends Set<infer T> ? T : never;

export function isValidCategory(category: unknown): category is Category {
  return typeof category === 'string' && CATEGORIES.has(category);
}
