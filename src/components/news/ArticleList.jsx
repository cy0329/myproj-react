import useAxios from 'axios-hooks';
import DebugStates from 'components/DebugStates';
import ArticleSummary from './ArticleSummary';

function ArticleList() {
  const [{ data: articleList, loading, error }, refetch] = useAxios(
    'http://localhost:8000/news/api/articles/',
  );

  return (
    <div>
      <h3>뉴스 기사 목록 보여줄 것</h3>
      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      {articleList &&
        articleList.map((article) => <ArticleSummary article={article} />)}
      <DebugStates articleList={articleList} loading={loading} error={error} />
    </div>
  );
}

export default ArticleList;
