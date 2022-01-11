import { useNavigate } from 'react-router-dom';

function PageBlogDetail({ post, handleEdit, handleDelete }) {
  const { title } = post;
  const { id: postId } = post;
  const navigate = useNavigate();
  return (
    <div className="shadow bg-white hover:bg-gray-100 border hover:border-yellow-400 my-1 p-1 rounded">
      <div className="px-1 pt-2">
        <span
          onClick={() => handleEdit()}
          className="rounded px-2 py-1 bg-blue-200 hover:bg-blue-500 hover:text-white cursor-pointer mr-1"
        >
          수정
        </span>
        <span
          onClick={() => handleDelete()}
          className="rounded px-2 py-1 bg-red-200 hover:bg-red-500 hover:text-white cursor-pointer mr-1"
        >
          삭제
        </span>
      </div>
      <div className="my-3"></div>
      <p
        onClick={() => {
          navigate(`/blogs/${postId}/`);
        }}
        className="text-center px-2 py-1 mx-1 mb-1 rounded bg-green-100 hover:bg-green-400 cursor-pointer"
      >
        {title}
      </p>
    </div>
  );
}

export default PageBlogDetail;
