import Axios from 'axios';
import useFieldValues from 'hooks/useFieldValues';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ReviewForm() {
  const navigate = useNavigate();
  const [errorObject, setErrorObject] = useState(null);
  const [editData, setEditData] = useState({
    content: '',
    score: 0,
  });
  const [fieldValues, handleChange, setFieldValues] = useFieldValues(editData);

  let { reviewId } = useParams();
  const refresh = () => {
    setErrorObject(null);
    const url = `http://127.0.0.1:8000/shop/api/reviews/${reviewId}/`;
    if (reviewId) {
      Axios.get(url)
        .then(({ data }) =>
          setEditData({ content: data.content, score: data.score }),
        )
        .catch((error) => setErrorObject(error))
        .finally(() => setFieldValues(editData));
    } else {
      setFieldValues({ content: '', score: 0 });
    }
  };

  // const updateReview = () => {
  //   const url = `http://127.0.0.1:8000/shop/api/reviews/${reviewId}/`;
  //   Axios.patch(url, fieldValues)
  //     .then(() => navigate('/reviews/'))
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const createReview = () => {
    const url = 'http://127.0.0.1:8000/shop/api/reviews/';
    !reviewId
      ? Axios.post(url, fieldValues)
          .then(() => {
            navigate('/reviews/');
          })
          .catch((error) => {
            console.log(error);
          })
      : Axios.patch(
          `http://127.0.0.1:8000/shop/api/reviews/${reviewId}/`,
          fieldValues,
        )
          .then(() => {
            navigate('/reviews/');
          })
          .catch((error) => {
            console.log(error);
          });
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
          createReview();
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
    </div>
  );
}

export default ReviewForm;
