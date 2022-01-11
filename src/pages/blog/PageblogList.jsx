import PageBlogDetail from 'pages/blog/PageblogDetail';
import DebugStates from 'components/DebugStates';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from 'api/base';
import useFieldValues from 'hooks/useFieldValues';

function PageblogList() {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { fieldValues, handleFieldChange } = useFieldValues('');

  useEffect(() => {
    refetch();
  }, []);

  const refetch = () => {
    setError(null);
    setLoading(true);
    const url = `/blog/api/posts/`;
    // Promise 객체 --> then, catch 지원, 체이닝 가능
    axiosInstance
      .get(url)
      .then(({ data }) => {
        console.group('정상 응답');
        console.log(data);
        console.groupEnd();
        setPostList(data);
      })
      .catch((error) => {
        console.group('에러 응답');
        console.log(error);
        console.groupEnd();
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const editPost = (editingPost) => {
    navigate(`/blogs/${editingPost.id}/edit/`);
  };

  const deletePost = (deletingPost) => {
    const { id: deletingPostId } = deletingPost;
    const url = `/blog/api/posts/${deletingPostId}/`;

    setLoading(true);
    setError(null);

    axiosInstance
      .delete(url)
      .then(() => {
        console.log('삭제 성공');
        // 선택1 : 삭제된 항목만 상탯값에서 제거
        setPostList((prevPostList) =>
          prevPostList.filter((post) => post.id !== deletingPostId),
        );
        // 선택2 : 전체를 새로고침
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
        navigate('/blogs/');
      });
  };

  const queryPost = (e) => {
    const query = fieldValues.query;
    if (e.key === 'Enter') {
      if (query === '') {
        refetch();
      } else {
        const url = `/blog/api/posts/`;
        axiosInstance
          .get(url)
          .then(({ data }) => {
            console.log(data);
            setPostList(data.filter(({ title }) => title.indexOf(query) > 0));
          })
          .catch((error) => setError(error));
      }
    }
  };

  return (
    <div className="bg-slate-200 p-3 rounded shadow">
      <h2 className="text-lg font-extrabold">블로그 포스팅</h2>
      <input
        name="query"
        value={fieldValues.query}
        className="block rounded w-full py-1 px-2 border border-black mb-2"
        placeholder="검색어를 입력해주세요."
        onChange={(e) => handleFieldChange(e)}
        onKeyPress={(e) => queryPost(e)}
      />
      {loading && <div>Loading...</div>}
      {error && <div>통신 중에 오류가 발생했습니다.</div>}
      <div className="mb-2">
        <button
          onClick={() => refetch()}
          className="bg-yellow-400 hover:bg-red-300 mr-2 rounded p-2"
        >
          새로고침
        </button>
        <button
          onClick={() => navigate('/blogs/new/')}
          className="bg-blue-400 hover:bg-slate-400 rounded p-2"
        >
          새 포스팅
        </button>
      </div>
      {postList.map((post) => (
        <PageBlogDetail
          key={post.id}
          post={post}
          handleEdit={() => editPost(post)}
          handleDelete={() => deletePost(post)}
        />
      ))}
      <div className="mb-2"></div>
      <DebugStates loading={loading} error={error} postList={postList} />
    </div>
  );
}

export default PageblogList;
