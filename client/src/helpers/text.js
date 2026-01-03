export const cleanArticleContent = (text = '') =>
  text.replace(/(\.\.\.).*$/s, '$1').trim();
