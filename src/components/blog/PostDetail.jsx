import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosInstance } from 'api/base';

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      <div className="block bg-blue-200 text-center text-xl py-2 mb-2 rounded">
        {post.title}
      </div>
      <img src="https://placeimg.com/640/480/animals" alt="" />
      <div className="mt-2 block bg-green-100 px-2 py-1">
        {post.content}
        {/* {post.content.split('\n\n').map((letter) => {
          return (
            <>
              {letter}
              <br />
            </>
          );
        })} */}
      </div>
    </div>
  );
}

export default PostDetail;
