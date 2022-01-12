const { Link } = require('react-router-dom');

function PostSummary({ post }) {
  return (
    <div className="rounded border border-gray-400 p-2 bg-white mb-2">
      <Link to={`/blogs/${post.id}/`}>
        <p className="text-center hover:bg-green-200 rounded p-1">
          {post.title}
        </p>
      </Link>
    </div>
  );
}
export default PostSummary;
