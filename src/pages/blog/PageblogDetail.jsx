import PostDetail from 'components/blog/PostDetail';
import { useNavigate, useParams } from 'react-router-dom';

function PageBlogDetail() {
  const { postId } = useParams();
  return (
    <>
      <h2>블로그 보여주기</h2>
      <div className="shadow-lg border border-gray-400 bg-white my-1 p-2 rounded">
        <PostDetail postId={postId} />
      </div>
    </>
  );
}

export default PageBlogDetail;
