import ArticleDetail from 'components/news/ArticleDetail';
import { useParams } from 'react-router-dom';

function PageNewsArticleDetail() {
  const { articleId } = useParams();

  return (
    <div>
      <h2>뉴스 기사#{articleId} 보여주기</h2>
      <ArticleDetail articleId={articleId} />
      <h3>비슷한 기사 목록</h3>

      <h3>추천 기사</h3>

      <h3>광고</h3>
    </div>
  );
}
export default PageNewsArticleDetail;
