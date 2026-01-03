import { Router } from 'express';
import axios from 'axios';

import { toInt } from '../helpers/numbers.js';
import { CATEGORIES, isValidCategory } from '../helpers/categories.js';
import { cacheArticles, getCachedArticle } from '../helpers/cache.js';

const router = Router();

const GNEWS_BASE_URL = 'https://gnews.io/api/v4';

router.get('/health', (req, res) => res.json({ ok: true, name: 'WWNews API' }));

router.get('/categories', (req, res) => {
  res.json({ categories: Array.from(CATEGORIES), default: 'general' });
});

router.get('/news', async (req, res) => {
  const { lang, country, q } = req.query;

  const category = req.query.category || 'general';
  if (!isValidCategory(category)) {
    return res.status(400).json({
      error: `Invalid category. Allowed: ${Array.from(CATEGORIES).join(', ')}`,
    });
  }

  const max = toInt(req.query.max, 10, { min: 1, max: 100 });
  const page = toInt(req.query.page, 1, { min: 1, max: 100 });

  const API_KEY = process.env.GNEWS_API_KEY;
  const LANG_DEFAULT = process.env.GNEWS_LANG || 'en';
  const COUNTRY_DEFAULT = process.env.GNEWS_COUNTRY || 'us';

  try {
    const r = await axios.get(`${GNEWS_BASE_URL}/top-headlines`, {
      params: {
        category,
        lang: lang || LANG_DEFAULT,
        country: country || COUNTRY_DEFAULT,
        max,
        page,
        ...(q ? { q } : {}),
        apikey: API_KEY,
      },
      timeout: 10000,
    });

    cacheArticles(r.data?.articles);
    res.json(r.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: 'Failed to fetch top headlines' });
  }
});

router.get('/search', async (req, res) => {
  const {
    q,
    lang,
    country,
    sortby,
    in: inField,
    from,
    to,
    nullable,
    truncate,
  } = req.query;

  if (!q || String(q).trim().length === 0) {
    return res.status(400).json({ error: 'Missing required query param: q' });
  }

  const max = toInt(req.query.max, 10, { min: 1, max: 100 });
  const page = toInt(req.query.page, 1, { min: 1, max: 100 });

  const API_KEY = process.env.GNEWS_API_KEY;
  const LANG_DEFAULT = process.env.GNEWS_LANG || 'en';
  const COUNTRY_DEFAULT = process.env.GNEWS_COUNTRY || 'us';

  try {
    const r = await axios.get(`${GNEWS_BASE_URL}/search`, {
      params: {
        q: String(q),
        lang: lang || LANG_DEFAULT,
        country: country || COUNTRY_DEFAULT,
        max,
        page,
        ...(sortby ? { sortby } : {}),
        ...(inField ? { in: inField } : {}),
        ...(from ? { from } : {}),
        ...(to ? { to } : {}),
        ...(nullable ? { nullable } : {}),
        ...(truncate ? { truncate } : {}),
        apikey: API_KEY,
      },
      timeout: 10000,
    });

    cacheArticles(r.data?.articles);
    res.json(r.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: 'Failed to search news' });
  }
});

router.get('/article/:id', (req, res) => {
  const article = getCachedArticle(req.params.id);
  if (!article) {
    return res.status(404).json({
      error:
        'Article not found in cache. Fetch list/search first (Home/Category/Search), then open details.',
    });
  }
  res.json({ article });
});

export default router;
