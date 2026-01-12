export const cleanArticleContent = (text: string = ''): string =>
  text.replace(/(\.\.\.).*$/s, '$1').trim();
