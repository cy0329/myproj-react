import { useApiAxios } from 'api/base';
import LoadingIndicator from 'components/LoadingIndicator';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ArticleDetail({ articleId }) {
  const navigate = useNavigate();

  const [{ data: article, loading, error }, refetch] = useApiAxios(
    `/news/api/articles/${articleId}`,
  );

  const [{ loading: deleteLoading, error: deleteError }, deleteArticle] =
    useApiAxios(
      {
        url: `/news/api/articles/${articleId}`,
        method: 'DELETE',
      },
      { manual: true },
    );

  useEffect(() => {
    refetch();
  }, []);

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시렵니까?')) {
      // REST_API에서는 DELETE요청에 대한 응답이 없습니다.
      deleteArticle().then(() => {
        navigate('/news/');
        // 삭제되었습니다. --> 이런 메세지를 context API를 사용해서 해볼 수 있음
        // flash message
      });
    }
  };

  // axios-hooks 사용
  return (
    <div>
      {loading && <LoadingIndicator>로딩 중...</LoadingIndicator>}
      {deleteLoading && <LoadingIndicator>삭제 중...</LoadingIndicator>}
      {error &&
        `로딩 중 에러가 발생했습니다. (${error.response.status} ${error.response.statusText})`}
      {deleteError &&
        `삭제 요청 중 에러가 발생했습니다. (${deleteError.response.status} ${deleteError.response.statusText})`}
      {article && (
        <>
          <h3 className="text-2xl my-5">{article.title}</h3>
          <div>
            {article.content.split(/[\r\n]+/).map((line, index) => (
              <p className="text-lg my-3" key={index}>
                {line}
              </p>
            ))}
          </div>
        </>
      )}
      <hr className="my-3" />
      <div className="flex gap-4 mt-3 mb-10">
        <Link to="/news/" className="hover:text-blue-400">
          목록으로
        </Link>
        <Link to={`/news/${articleId}/edit/`} className="hover:text-green-400">
          수정하기
        </Link>
        <button
          disabled={deleteLoading}
          onClick={handleDelete}
          className="hover:text-red-400"
        >
          삭제하기
        </button>
      </div>
    </div>
  );
}

export default ArticleDetail;
