export const CATEGORIES = new Set([
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

export const isValidCategory = (category) => CATEGORIES.has(category);
