// import useFieldValues from 'hooks/useFieldValues';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DebugStates from 'components/DebugStates';
import { axiosInstance } from 'api/base';

function ReviewForm() {
  const navigate = useNavigate();
  const { reviewId } = useParams();
  const [errorObject, setErrorObject] = useState(null);
  // const [review, setReview] = useState(null);
  // useFieldValues 전부 가져와서 써보기 ----------------------------------------
  const [fieldValues, setFieldValues] = useState({ content: '', score: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldValues((prevFieldValues) => ({
      ...prevFieldValues,
      [name]: value,
    }));
  };

  const clearFieldValues = () => setFieldValues({ content: '', score: 0 });
  // ------------------------------- 사용 성공 ------------------------------------
  // useFieldValues도 useEffect처럼 훅이기 때문에 이전 방법으로 사용할 시
  // useEffect가 먼저 호출되어 setFieldValues가 실행되고(비동기 세상이라서...?)
  // 그 후 useFieldVlaues로 지정해주는 초기값이 세팅되기 때문에
  // 수정 버튼 클릭 시 계속 초기값인 {content: '', score: 0}으로 바뀌어 소환되었던 것.
  // export 의 문법 중 다른 방법을 사용한다면 useFieldValues 를 안쓰고도 그 훅 안의 내용들을
  // 사용할 수 있을 것 같지만....

  useEffect(() => {
    if (reviewId) {
      const url = `/shop/api/reviews/${reviewId}/`;
      axiosInstance
        .get(url)
        .then(({ data }) => {
          setFieldValues((prevFieldValues) => ({
            ...prevFieldValues,
            content: data.content,
            score: data.score,
          }));
        })
        .catch((error) => setErrorObject(error));
    } else {
      setFieldValues({ content: '', score: 0 });
    }
  }, [reviewId]);

  // sol 보고 비교하며 고쳐보기
  const saveReview = async () => {
    setErrorObject(null);
    const url = !reviewId
      ? `/shop/api/reviews/`
      : `/shop/api/reviews/${reviewId}/`;
    try {
      if (!reviewId) {
        await axiosInstance.post(url, fieldValues);
      } else {
        await axiosInstance.put(url, fieldValues);
      }
      navigate('/reviews/');
    } catch (e) {
      setErrorObject(e);
      console.error(e);
    }
  };

  return (
    <div className="border-2 border-gray-500 p-3 rounded">
      <h2>Review Form</h2>
      <select
        onChange={handleChange}
        name="score"
        value={fieldValues.score}
        className="block appearence-none w-full border border-gray-400 py-3 px-4 rounded"
      >
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <br />
      <textarea
        type="text"
        className="shadow w-full border border-gray-400 rounded"
        onChange={handleChange}
        name="content"
        value={fieldValues.content}
      />
      <br />
      <button
        onClick={() => {
          saveReview();
          navigate('/reviews/');
        }}
        className="bg-blue-200 hover:bg-blue-500 rounded py-2 px-3 mr-2"
      >
        저장하기
      </button>
      <button
        onClick={() => navigate('/reviews/')}
        className="bg-yellow-200 hover:bg-yellow-500 rounded py-2 px-3 mr-2"
      >
        돌아가기
      </button>
      <DebugStates reviewId={reviewId} />
    </div>
  );
}

export default ReviewForm;
