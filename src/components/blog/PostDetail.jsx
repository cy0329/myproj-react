import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosInstance } from 'api/base';
import { useNavigate } from 'react-router-dom';

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, []);

  const refetch = async () => {
    setError(null);
    setLoading(true);

    const url = `/blog/api/posts/${postId}/`;
    // Promise 객체 --> then, catch 지원, 체이닝 가능
    await axiosInstance
      .get(url)
      .then(({ data }) => {
        console.group('정상 응답');
        console.log(data);
        console.groupEnd();
        setPost(data);
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

  return (
    <div>
      <div className="block bg-blue-200 text-center text-xl py-2 px-1 mb-2 rounded">
        {post.title}
      </div>
      <img src="https://placeimg.com/640/480/animals" alt="" />
      <div className="mt-2 block bg-green-100 px-2 py-1">{post.content}</div>
      <button
        onClick={() => navigate('/blogs/')}
        className="my-5 bg-yellow-100 hover:bg-red-200 rounded px-2 py-1 cursor-pointer"
      >
        홈으로
      </button>
    </div>
  );
}

export default PostDetail;
