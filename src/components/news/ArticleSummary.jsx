import { Link } from 'react-router-dom';

function ArticleSummary({ article }) {
  return (
    <div>
      요약 :<Link to={`/news/${article.id}/`}>{article.title}</Link>
    </div>
  );
}
export default ArticleSummary;
