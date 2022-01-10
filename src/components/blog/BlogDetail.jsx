import { useNavigate } from 'react-router-dom';

function BlogDetail({ post, handleEdit, handleDelete }) {
  const { title } = post;
  const { id: postId } = post;
  const navigate = useNavigate;
  return (
    <div className="bg-yellow-100 border border-yellow-400 my-1 p-1">
      <div>
        <span
          onClick={() => handleEdit()}
          className="hover:text-blue-400 cursor-pointer mr-1"
        >
          수정
        </span>
        <span
          onClick={() => handleDelete()}
          className="hover:text-red-400 cursor-pointer mr-1"
        >
          삭제
        </span>
      </div>
      <span
        onClick={() => {
          navigate(`/blogs/${postId}/`);
        }}
      >
        {title}
      </span>
    </div>
  );
}

export default BlogDetail;
