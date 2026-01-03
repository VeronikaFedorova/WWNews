import NewsCard from './NewsCard';

export default function NewsList({ articles = [] }) {
  return (
    <div className='grid gap-0 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-4 md:py-6'>
      {articles.map((article, index) => {
        const isLarge = index % 5 === 0;

        return (
          <NewsCard
            key={article.id}
            article={article}
            variant={isLarge ? 'large' : 'small'}
          />
        );
      })}
    </div>
  );
}
