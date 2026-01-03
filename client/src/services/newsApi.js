import { api } from './api';

export const searchNews = ({ signal, ...params }) =>
  api.get('/search', { params, signal });
export const getCategories = () => api.get('/categories');
export const getTopHeadlines = (params) => api.get('/news', { params });
export const getArticleById = (id) => api.get(`/article/${id}`);
