import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosInstance, useApiAxios } from 'api/base';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from 'components/LoadingIndicator';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from 'hooks/AuthContext';

function PostDetail({ postId }) {
  const { auth } = useAuthContext();
  const navigate = useNavigate();

  const [{ data: post, loading, error }, refetch] = useApiAxios(
    `/blog/api/posts/${postId}/`,
  );

  useEffect(() => {
    refetch();
  }, []);

  const [{ loading: deleteLoading, error: deleteError }, deletePost] =
    useApiAxios(
      {
        url: `/blog/api/posts/${postId}/`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true },
    );

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deletePost().then(() => {
        navigate('/blogs/');
        toast.success('삭제가 완료되었습니다.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // 삭제되었습니다. --> 이런 메세지를 context API를 사용해서 해볼 수 있음
        // flash message
      });
    }
  };

  return (
    <div>
      {loading && <LoadingIndicator>로딩 중...</LoadingIndicator>}
      {deleteLoading && <LoadingIndicator>삭제 중...</LoadingIndicator>}
      {error &&
        `로딩 중 에러가 발생했습니다. (${error.response.status} ${error.response.statusText})`}
      {deleteError &&
        `삭제 요청 중 에러가 발생했습니다. (${deleteError.response.status} ${deleteError.response.statusText})`}
      {post && (
        <>
          <div className="block bg-blue-200 text-center text-lg py-2 px-2 mb-2 rounded">
            {post.title}
          </div>
          <img
            src="https://placeimg.com/640/480/animals"
            alt=""
            className="rounded-lg"
          />
          <div>
            <div className="mt-2 block border shadow bg-white px-2 py-1">
              {post.content?.split('\n').map((letter) => (
                <>
                  {letter}
                  <br />
                </>
              ))}
            </div>
          </div>
        </>
      )}

      <button
        onClick={() => navigate('/blogs/')}
        className="my-5 bg-yellow-200 hover:bg-blue-200 rounded px-2 py-1 cursor-pointer mr-3"
      >
        홈으로
      </button>
      <button
        onClick={() => navigate(`/blogs/${postId}/edit/`)}
        className="my-5 bg-green-200 hover:bg-blue-200 rounded px-2 py-1 cursor-pointer mr-3"
      >
        수정하기
      </button>
      <button
        onClick={handleDelete}
        className="my-5 bg-red-200 hover:bg-blue-200 rounded px-2 py-1 cursor-pointer"
      >
        삭제하기
      </button>
    </div>
  );
}

export default PostDetail;
