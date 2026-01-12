const ARTICLE_TTL_MS = 30 * 60 * 1000;

export type CacheableArticle = {
  id: string;
  [key: string]: unknown;
};

type CacheEntry<T> = {
  article: T;
  expiresAt: number;
};

const articleCache = new Map<string, CacheEntry<CacheableArticle>>();

export function cacheArticles(
  articles: ReadonlyArray<CacheableArticle> = []
): void {
  const now = Date.now();

  for (const a of articles) {
    if (!a?.id) continue;

    articleCache.set(a.id, {
      article: a,
      expiresAt: now + ARTICLE_TTL_MS,
    });
  }
}

export function getCachedArticle(id: string): CacheableArticle | null {
  const hit = articleCache.get(id);
  if (!hit) return null;

  if (Date.now() > hit.expiresAt) {
    articleCache.delete(id);
    return null;
  }

  return hit.article;
}
