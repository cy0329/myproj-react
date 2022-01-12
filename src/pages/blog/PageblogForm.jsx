import { useNavigate, useParams } from 'react-router-dom';
import DebugStates from 'components/DebugStates';
import PostForm from 'components/blog/PostForm';

function PageblogForm() {
  const navigate = useNavigate();
  const { postId } = useParams();

  return (
    <div>
      <h2>블로그 글쓰기 : {postId ? '<<수정>>' : '<<생성>>'}</h2>
      <PostForm
        postId={postId}
        handleDidSave={(savedPost) => navigate(`/blogs/${savedPost.id}/`)}
      />
    </div>
  );
}

export default PageblogForm;
