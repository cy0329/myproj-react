import { useNavigate } from 'react-router-dom';

function BlogForm({ fieldValues, handleFieldChange, handleSubmit, loading }) {
  const navigate = useNavigate();
  const handleClickedSubmitButton = () => {
    if (handleSubmit) {
      handleSubmit();
    } else {
      console.warn('handleSubmit 속성값을 지정해주세요.');
    }
  };

  return (
    <div>
      <div className="mb-3">
        <h2 className="text-lg">제목</h2>
        <input
          type="text"
          name="title"
          value={fieldValues.title}
          onChange={handleFieldChange}
          className="block w-full border border-gray-400 py-3 px-4 rounded"
        />
      </div>
      <div>
        <h2 className="text-lg">내용</h2>
        <textarea
          name="content"
          value={fieldValues.content}
          onChange={handleFieldChange}
          className="block w-full py-20 border border-gray-400 rounded"
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-blue-200 hover:bg-blue-500 rounded py-2 px-3 mr-2 cursor-pointer"
          onClick={() => handleClickedSubmitButton()}
          disabled={loading}
        >
          저장하기
        </button>
        <button
          onClick={() => navigate('/blogs/')}
          className="bg-yellow-200 hover:bg-yellow-500 rounded py-2 px-3 mr-2"
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}

export default BlogForm;
