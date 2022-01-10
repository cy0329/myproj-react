import Axios from 'axios';
import BlogDetail from 'components/blog/BlogDetail';
import DebugStates from 'components/DebugStates';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PageblogList() {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, []);

  const refetch = () => {
    setError(null);
    setLoading(true);
    const url = 'http://127.0.0.1:8000/blog/api/posts/';
    // Promise 객체 --> then, catch 지원, 체이닝 가능
    Axios.get(url)
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
    const url = `http://127.0.0.1:8000/blog/api/posts/${deletingPostId}/`;

    setLoading(true);
    setError(null);

    Axios.delete(url)
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

  return (
    <div className="">
      <h2>Blog List</h2>
      {loading && <div>Loading...</div>}
      {error && <div>통신 중에 오류가 발생했습니다.</div>}

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

      {postList.map((post) => (
        <BlogDetail
          key={post.id}
          post={post}
          handleEdit={() => editPost(post)}
          handleDelete={() => deletePost(post)}
        />
      ))}

      <hr />
      <DebugStates loading={loading} error={error} postList={postList} />
    </div>
  );
}

export default PageblogList;
