import { Router } from 'express';
import axios from 'axios';

import { toInt } from '../helpers/numbers.js';
import { CATEGORIES, isValidCategory } from '../helpers/categories.js';
import { cacheArticles, getCachedArticle } from '../helpers/cache.js';
import { fetchTopHeadlines, searchNews } from '../services/gnews.service.js';
import { handleHttpError } from '../utils/httpError.js';
import { createRequestSignal } from '../utils/requestAbort.js';

const router = Router();

router.get('/categories', (_req, res) => {
  res.json({ categories: Array.from(CATEGORIES), default: 'general' });
});

router.get('/news', async (req, res) => {
  const categoryRaw = req.query.category ?? 'general';
  if (!isValidCategory(categoryRaw)) {
    return res.status(400).json({
      error: `Invalid category. Allowed: ${Array.from(CATEGORIES).join(', ')}`,
    });
  }

  const max = toInt(req.query.max, 10, { min: 1, max: 100 });
  const page = toInt(req.query.page, 1, { min: 1, max: 100 });

  const signal = createRequestSignal(req, 10000);

  try {
    const data = await fetchTopHeadlines(
      {
        category: categoryRaw,
        max,
        page,
        ...(req.query.q ? { q: String(req.query.q) } : {}),
      },
      { signal }
    );

    cacheArticles((data as any)?.articles);
    return res.json(data);
  } catch (e: unknown) {
    if (
      axios.isAxiosError(e) &&
      (e.code === 'ERR_CANCELED' || e.name === 'CanceledError')
    ) {
      return;
    }

    return handleHttpError(e, res, 'Failed to fetch news');
  }
});

router.get('/search', async (req, res) => {
  if (!req.query.q) {
    return res.status(400).json({ error: 'Missing query param q' });
  }

  const max = toInt(req.query.max, 10, { min: 1, max: 100 });
  const page = toInt(req.query.page, 1, { min: 1, max: 100 });

  const signal = createRequestSignal(req, 10000);

  try {
    const data = await searchNews(
      {
        q: String(req.query.q),
        max,
        page,
      },
      { signal }
    );

    cacheArticles((data as any)?.articles);
    return res.json(data);
  } catch (e: unknown) {
    if (
      axios.isAxiosError(e) &&
      (e.code === 'ERR_CANCELED' || e.name === 'CanceledError')
    ) {
      return;
    }

    return handleHttpError(e, res, 'Failed to search news');
  }
});

router.get('/article/:id', (req, res) => {
  const article = getCachedArticle(req.params.id);
  if (!article) {
    return res.status(404).json({ error: 'Article not found in cache' });
  }
  return res.json({ article });
});

export default router;
