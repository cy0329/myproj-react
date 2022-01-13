import { Link } from 'react-router-dom';

function ArticleSummary({ article }) {
  return (
    <div className="mb-2">
      {article.photo && (
        <img
          src={article.photo}
          alt={article.title}
          className="w-7 h-7 mr-1 rounded inline"
        />
      )}
      <Link to={`/news/${article.id}/`}>{article.title}</Link>
    </div>
  );
}
export default ArticleSummary;
