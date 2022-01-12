import { useApiAxios } from 'api/base';
import Button from 'components/Button';
import DebugStates from 'components/DebugStates';
import LoadingIndicator from 'components/LoadingIndicator';
import useFieldValues from 'hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';

const INIT_FIELD_VALUES = { title: '', content: '' };

function PostForm({ postId, handleDidSave }) {
  const navigate = useNavigate();
  const [{ data: post, loading: getLoading, error: getError }] = useApiAxios(
    `/blog/api/posts/${postId}/`,
    { manual: !postId },
  );

  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: !postId ? `/blog/api/posts/` : `/blog/api/posts/${postId}/`,
      method: !postId ? 'POST' : 'PUT',
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange } = useFieldValues(
    post || INIT_FIELD_VALUES,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    saveRequest({
      data: fieldValues,
    }).then((response) => {
      const savedPost = response.data;
      if (handleDidSave) handleDidSave(savedPost);
    });
  };

  return (
    <div>
      {saveLoading && <LoadingIndicator>저장 중 ...</LoadingIndicator>}
      {saveError &&
        `저장 중 에러가 발생했습니다. (${saveError.response.status} ${saveError.response.statusText})`}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <h2 className="text-lg">제목</h2>
          <input
            type="text"
            name="title"
            value={fieldValues.title}
            onChange={handleFieldChange}
            className="block w-full border border-gray-400 py-3 px-4 rounded"
          />
          {saveErrorMessages.title?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div>
          <h2 className="text-lg">내용</h2>
          <textarea
            name="content"
            value={fieldValues.content}
            onChange={handleFieldChange}
            className="w-full pb-40 px-2 border border-gray-400 rounded"
          />
          {saveErrorMessages.content?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-200 hover:bg-yellow-400 rounded py-2 px-3 mr-2"
          >
            저장하기
          </button>

          <button
            onClick={() => navigate('/blogs/')}
            className="bg-red-200 hover:bg-yellow-400 rounded py-2 px-3 mr-2"
          >
            돌아가기
          </button>
        </div>
      </form>
      <DebugStates
        post={post}
        getLoading={getLoading}
        getError={getError}
        saveErrorMessages={saveErrorMessages}
        fieldValues={fieldValues}
      />
    </div>
  );
}

export default PostForm;
