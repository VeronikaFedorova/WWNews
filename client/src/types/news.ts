export type Article = {
  id: string;
  title: string;
  description?: string | null;
  url: string;
  image?: string | null;
  publishedAt: string;
  source?: { name?: string; url?: string };
  [key: string]: unknown;
};
