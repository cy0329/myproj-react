import { useNavigate, useParams } from 'react-router-dom';
import DebugStates from 'components/DebugStates';
import ReviewFormC from 'components/ReviewFormSol';
import useFieldValues from 'hooks/useFieldValues';
import { useEffect, useState } from 'react';
import { axiosInstance } from 'api/base';

function PageReviewForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // 상탯값 정의. 훅 호출
  const navigate = useNavigate();
  const { reviewId } = useParams();
  const { fieldValues, handleFieldChange, setFieldValues, clearFieldValues } =
    useFieldValues({
      score: 5,
      content: '',
    });

  useEffect(() => {
    const fetchReview = async () => {
      setLoading(true);
      setError(null);

      const url = `/shop/api/reviews/${reviewId}/`;
      try {
        const response = await axiosInstance.get(url);
        setFieldValues(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    if (reviewId) fetchReview();
    else clearFieldValues();
  }, [reviewId, setFieldValues, clearFieldValues]);

  // 다양한 함수를 정의
  const saveReview = async () => {
    setLoading(true);
    setError(null);

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
      setError(e);
      console.error(e);
    }
    setLoading(false);
  };

  // 표현 by jsx
  return (
    <div>
      <h2>
        ReviewForm
        {reviewId ? '수정' : '생성'}
      </h2>
      <ReviewFormC
        fieldValues={fieldValues}
        handleFieldChange={handleFieldChange}
        handleSubmit={saveReview}
        loading={loading}
      />
      <DebugStates reviewId={reviewId} fieldValues={fieldValues} />
    </div>
  );
}

export default PageReviewForm;
