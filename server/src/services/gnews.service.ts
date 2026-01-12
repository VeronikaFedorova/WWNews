import axios from 'axios';

const GNEWS_BASE_URL = 'https://gnews.io/api/v4';

type GNewsParams = Record<string, unknown>;

function getEnv() {
  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) {
    throw new Error('Missing GNEWS_API_KEY');
  }

  return {
    apiKey,
    lang: process.env.GNEWS_LANG ?? 'en',
    country: process.env.GNEWS_COUNTRY ?? 'us',
  };
}

async function request<T>(
  endpoint: string,
  params: GNewsParams,
  signal?: AbortSignal
): Promise<T> {
  const { apiKey, lang, country } = getEnv();

  const res = await axios.get<T>(`${GNEWS_BASE_URL}/${endpoint}`, {
    params: {
      lang,
      country,
      ...params,
      apikey: apiKey,
    },
    timeout: 10000,
    signal,
  });

  return res.data;
}

export function fetchTopHeadlines(
  params: GNewsParams,
  opts?: { signal?: AbortSignal }
) {
  return request('top-headlines', params, opts?.signal);
}

export function searchNews(
  params: GNewsParams,
  opts?: { signal?: AbortSignal }
) {
  return request('search', params, opts?.signal);
}
