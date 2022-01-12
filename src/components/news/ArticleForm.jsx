import useAxios from 'axios-hooks';
import Button from 'components/Button';
import DebugStates from 'components/DebugStates';
import H2 from 'components/H2';
import LoadingIndicator from 'components/LoadingIndicator';
import useFieldValues from 'hooks/useFieldValues';

// !articleId : 생성
// articleId : 수정

// 무한루프 방지 (현재 useFieldValues 훅에서 생길 수 있는 상황)
const INIT_FIELD_VALUES = { title: '', content: '' };
function ArticleForm({ handledidSave }) {
  const [{ loading: saveLoading, error: saveError }, saveRequest] = useAxios(
    { url: '/news/api/articles/', method: 'POST' },
    { manual: true },
  );

  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FIELD_VALUES);

  const handleSubmit = (e) => {
    // 에러 발생시 새로 렌더링 하는 것을 방지
    e.preventDefault();
    // promise를 리턴
    saveRequest({
      data: fieldValues,
    }).then((response) => {
      const savedPost = response.data;
      if (handledidSave) handledidSave(savedPost);
    });
  };

  return (
    <div>
      <H2>Article Form</H2>
      {/* form으로 써서 이렇게 해주는게 더 의미가 맞다. */}
      {saveLoading && <LoadingIndicator>저장 중...</LoadingIndicator>}
      {saveError &&
        `저장 중 에러가 발생했습니다. (${saveError.response.status} ${saveError.response.statusText})`}

      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <input
            name="title"
            value={fieldValues.title}
            onChange={handleFieldChange}
            type="text"
            className="p-1 bg-gray-100 w-full outline-none focus:border focus:border-gray-400 focus:border-dashed"
          />
        </div>

        <div className="my-3 ">
          <textarea
            name="content"
            value={fieldValues.content}
            onChange={handleFieldChange}
            className="p-1 bg-gray-100 w-full pb-40 outline-none focus:border focus:border-gray-400 focus:border-dashed"
          />
        </div>
        <div className="my-3">
          <Button>저장하기</Button>
        </div>
      </form>
      <DebugStates fieldValues={fieldValues} />
    </div>
  );
}

export default ArticleForm;
