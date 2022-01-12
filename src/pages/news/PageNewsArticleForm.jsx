import ArticleForm from 'components/news/ArticleForm';
import { useNavigate } from 'react-router-dom';

function PageNewsArticleForm() {
  const navigate = useNavigate();
  return (
    <ArticleForm
      articleId={null}
      handleDidSave={(savedPost) => navigate(`/news/${savedPost.id}/`)}
    />
  );
}
export default PageNewsArticleForm;
