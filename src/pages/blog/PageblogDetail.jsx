import { useNavigate, useParams } from 'react-router-dom';

function BlogDetail({ post, handleEdit, handleDelete }) {
  const { title } = post;
  const { id: postId } = post;
  const navigate = useNavigate();
  return (
    <div className="shadow bg-white hover:bg-gray-100 border hover:border-yellow-400 my-1 p-1 rounded">
      <div>
        <span
          onClick={() => handleEdit()}
          className="mb-3 rounded px-2 py-1 bg-blue-200 hover:bg-blue-500 hover:text-white cursor-pointer mr-1"
        >
          수정
        </span>
        <span
          onClick={() => handleDelete()}
          className="mb-3 rounded px-2 py-1 bg-red-200 hover:bg-red-500 hover:text-white cursor-pointer mr-1"
        >
          삭제
        </span>
      </div>
      <div className="my-3"></div>
      <span
        onClick={() => {
          navigate(`/blogs/${postId}/`);
        }}
        className="px-2 py-1 rounded hover:bg-green-200 cursor-pointer"
      >
        {title}
      </span>
    </div>
  );
}

export default BlogDetail;
