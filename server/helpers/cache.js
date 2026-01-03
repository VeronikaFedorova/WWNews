const ARTICLE_TTL_MS = 30 * 60 * 1000;

const articleCache = new Map();

export const cacheArticles = (articles = []) => {
  const now = Date.now();
  for (const a of articles) {
    if (!a?.id) continue;
    articleCache.set(a.id, {
      article: a,
      expiresAt: now + ARTICLE_TTL_MS,
    });
  }
};

export const getCachedArticle = (id) => {
  const hit = articleCache.get(id);
  if (!hit) return null;
  if (Date.now() > hit.expiresAt) {
    articleCache.delete(id);
    return null;
  }
  return hit.article;
};
