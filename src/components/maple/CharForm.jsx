import { useApiAxios } from 'api/base';
import DebugStates from 'components/DebugStates';
import useFieldValues from 'hooks/useFieldValues';
import produce from 'immer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CharForm.css';

const INIT_FIELD_VALUES = {
  job: '',
  description: '',
  invincibility: true,
  bind: false,
  rush: false,
  teleport: false,
  hunt_rating: 1,
  raid_rating: 1,
};

function CharForm({ charId, handleDidSave }) {
  const navigate = useNavigate();
  const [{ data: charData, loading: getLoading, error: getError }] =
    useApiAxios(`/maple/api/character/${charId}/`, { manual: !charId });

  const [
    { loading: saveLoading, error: saveError, errorMessages: saveErrorMessage },
    saveRequest,
  ] = useApiAxios(
    {
      url: !charId
        ? `/maple/api/character/`
        : `/maple/api/character/${charId}/`,
      method: !charId ? 'POST' : 'PUT',
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    charData || INIT_FIELD_VALUES,
  );

  useEffect(() => {
    setFieldValues(
      produce((draft) => {
        draft.photo = '';
      }),
    );
  }, [charData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(fieldValues).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        const fileList = value;
        fileList.forEach((file) => formData.append(name, file));
      } else {
        formData.append(name, value);
      }
    });
    saveRequest({
      data: formData,
    }).then((response) => {
      const savedPost = response.data;
      if (handleDidSave) handleDidSave(savedPost);
    });
  };

  return (
    <div>
      <h2>캐릭터 폼</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="job"
            value={fieldValues.job}
            onChange={handleFieldChange}
            placeholder="직업을 입력해주세요."
            className="w-full block px-2 border-2 border-blue-400 rounded my-2"
          />
        </div>
        <div>
          <textarea
            name="description"
            value={fieldValues.description}
            onChange={handleFieldChange}
            placeholder="설명을 입력해주세요."
            className="w-full block p-2 border-2 border-red-400 rounded my-2 pb-40"
          />
        </div>
        <div>
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .jfif"
            name="photo"
            onChange={handleFieldChange}
          />
        </div>
        <div className="mt-2">
          <div className="inline-block border-2 border-purple-500 rounded-lg mr-2 w-40 p-2">
            <h2>무적기 보유 여부</h2>
            <label className="switch-button">
              <input
                type="checkbox"
                onChange={handleFieldChange}
                value={fieldValues.invincibility}
                name="invincibility"
                checked={fieldValues.invincibility}
              />
              <span className="onoff-switch"></span>
            </label>
          </div>
          <div className="inline-block border-2 border-purple-500 rounded-lg mr-2 w-40 p-2">
            <h2>바인드 보유 여부</h2>
            <label className="switch-button">
              <input
                type="checkbox"
                onChange={handleFieldChange}
                value={fieldValues.bind}
                name="bind"
                checked={fieldValues.bind}
              />
              <span className="onoff-switch"></span>
            </label>
          </div>
        </div>
        <div className="mt-2">
          <div className="inline-block border-2 border-purple-500 rounded-lg mr-2 w-40 p-2">
            <h2>돌진기 보유 여부</h2>
            <label className="switch-button">
              <input
                type="checkbox"
                onChange={handleFieldChange}
                value={fieldValues.rush}
                name="rush"
                checked={fieldValues.rush}
              />
              <span className="onoff-switch"></span>
            </label>
          </div>
          <div className="inline-block border-2 border-purple-500 rounded-lg mr-2 w-40 p-2">
            <h2>텔레포트 보유 여부</h2>
            <label className="switch-button">
              <input
                type="checkbox"
                onChange={handleFieldChange}
                value={fieldValues.teleport}
                name="teleport"
                checked={fieldValues.teleport}
              />
              <span className="onoff-switch"></span>
            </label>
          </div>
        </div>
        <div className="mt-2">
          <div className="inline-block mr-4 p-2 border-2 border-blue-400 rounded-lg">
            <h2>사냥 능력</h2>
            <select
              name="hunt_rating"
              value={fieldValues.hunt_rating}
              onChange={handleFieldChange}
              className="block w-full border-y-2 border-red-500"
            >
              <option>1</option>
              <option>1.5</option>
              <option>2</option>
              <option>2.5</option>
              <option>3</option>
              <option>3.5</option>
              <option>4</option>
              <option>4.5</option>
              <option>5</option>
            </select>
          </div>
          <div className="inline-block mr-4 p-2 border-2 border-blue-400 rounded-lg">
            <h2>보스 성능</h2>
            <select
              name="raid_rating"
              value={fieldValues.raid_rating}
              onChange={handleFieldChange}
              className="block w-full border-y-2 border-red-500"
            >
              <option>1</option>
              <option>1.5</option>
              <option>2</option>
              <option>2.5</option>
              <option>3</option>
              <option>3.5</option>
              <option>4</option>
              <option>4.5</option>
              <option>5</option>
            </select>
          </div>
        </div>
        <button
          onClick={() => {
            handleSubmit();
          }}
        >
          저장하기
        </button>
        <button onClick={() => navigate('/maple/')}>돌아가기</button>
      </form>
      <DebugStates
        charData={charData}
        getLoading={getLoading}
        getError={getError}
        saveErrorMessage={saveErrorMessage}
        fieldValues={fieldValues}
      />
    </div>
  );
}

export default CharForm;
