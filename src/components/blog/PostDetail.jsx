import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useEffect, useState } from 'react';

function PostDetail() {
  const { blogId } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    refetch();
  }, []);

  const refetch = () => {
    setError(null);
    setLoading(true);

    const url = `http://127.0.0.1:8000/blog/api/posts/${blogId}/`;
    // Promise 객체 --> then, catch 지원, 체이닝 가능
    Axios.get(url)
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
      {post.title}
      {post.content}
    </div>
  );
}

export default PostDetail;
