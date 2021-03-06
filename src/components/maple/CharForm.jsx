import { useApiAxios } from 'api/base';
import DebugStates from 'components/DebugStates';
import LoadingIndicator from 'components/LoadingIndicator';
import { useAuthContext } from 'hooks/AuthContext';
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
  const { auth } = useAuthContext();
  const navigate = useNavigate();
  const [{ data: charData, loading: getLoading, error: getError }] =
    useApiAxios(
      {
        url: `/maple/api/character/${charId}/`,
        method: 'GET',
      },
      { manual: !charId },
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
      url: !charId
        ? `/maple/api/character/`
        : `/maple/api/character/${charId}/`,
      method: !charId ? 'POST' : 'PUT',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
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
      {saveLoading && <LoadingIndicator>?????? ???...</LoadingIndicator>}
      {saveError &&
        `?????? ??? ????????? ??????????????????.(${saveError.response.status} ${saveError.response.statusText})`}
      <form onSubmit={handleSubmit}>
        <div>
          <h2 className="text-2xl text-extrabold inline mr-10">?????????</h2>

          <select
            name="category"
            value={fieldValues.category}
            onChange={handleFieldChange}
            className="border-2 border-purple-400 inline rounded-lg px-2 py-1 text-center text-xl mx-2 focus:outline-none focus:border-blue-400"
          >
            <option value="1">??????</option>
            <option value="2">?????????</option>
            <option value="3">??????</option>
            <option value="4">??????</option>
            <option value="5">??????</option>
          </select>
          <h2 className="text-2xl text-extrabold inline">?????????</h2>
          <input
            type="text"
            name="job"
            value={fieldValues.job}
            onChange={handleFieldChange}
            placeholder="????????? ??????????????????."
            className="w-full block px-2 border-2 hover:bg-gray-100 focus:border-blue-400 rounded my-2"
          />
          {saveErrorMessages.job?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div>
          <h2 className="text-2xl text-extrabold">??????</h2>
          <textarea
            name="description"
            value={fieldValues.description}
            onChange={handleFieldChange}
            placeholder="????????? ??????????????????."
            className="w-full block p-2 border-2 hover:bg-gray-100 focus:border-blue-400 rounded my-2 pb-40"
          />
          {saveErrorMessages.description?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
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
            <h2>????????? ?????? ??????</h2>
            <label className="switch-button">
              <input
                type="checkbox"
                onChange={handleFieldChange}
                name="invincibility"
                checked={fieldValues.invincibility}
              />
              <span className="onoff-switch"></span>
            </label>
          </div>
          <div className="inline-block border-2 border-purple-500 rounded-lg mr-2 w-40 p-2">
            <h2>????????? ?????? ??????</h2>
            <label className="switch-button">
              <input
                type="checkbox"
                onChange={handleFieldChange}
                name="bind"
                checked={fieldValues.bind}
              />
              <span className="onoff-switch"></span>
            </label>
          </div>
        </div>
        <div className="mt-2">
          <div className="inline-block border-2 border-purple-500 rounded-lg mr-2 w-40 p-2">
            <h2>????????? ?????? ??????</h2>
            <label className="switch-button">
              <input
                type="checkbox"
                onChange={handleFieldChange}
                name="rush"
                checked={fieldValues.rush}
              />
              <span className="onoff-switch"></span>
            </label>
          </div>
          <div className="inline-block border-2 border-purple-500 rounded-lg mr-2 w-40 p-2">
            <h2>???????????? ?????? ??????</h2>
            <label className="switch-button">
              <input
                type="checkbox"
                onChange={handleFieldChange}
                name="teleport"
                checked={fieldValues.teleport}
              />
              <span className="onoff-switch"></span>
            </label>
          </div>
          <div className="my-2 float-right">
            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
              className="py-2 w-20 rounded-2xl bg-gradient-to-r from-green-400 to-orange-400 text-white hover:from-orange-400 hover:to-green-300 hover:text-black mx-2 hover:scale-110"
            >
              ????????????
            </button>
            <button
              onClick={() => navigate(charId ? `/maple/${charId}/` : `/maple/`)}
              className="py-2 w-20 rounded-2xl bg-gradient-to-r from-green-400 to-orange-400 text-white hover:from-orange-400 hover:to-green-300 hover:text-black mx-2 hover:scale-110"
            >
              ????????????
            </button>
          </div>
        </div>
        <div className="mt-2">
          <div className="inline-block mr-2 w-40 p-2 border-2 border-blue-400 rounded-lg">
            <h2>?????? ??????</h2>
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
          <div className="inline-block mr-2 w-40 p-2 border-2 border-blue-400 rounded-lg">
            <h2>?????? ??????</h2>
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
      </form>

      <DebugStates
        charData={charData}
        getLoading={getLoading}
        getError={getError}
        saveErrorMessage={saveErrorMessages}
        fieldValues={fieldValues}
      />
    </div>
  );
}

export default CharForm;
