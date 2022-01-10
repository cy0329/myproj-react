import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import DebugStates from 'components/DebugStates';
import BlogForm from 'components/blog/BlogForm';
import useFieldValues from 'hooks/useFieldValues';
import { useEffect, useState } from 'react';

function PageblogForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // 상탯값 정의. 훅 호출
  const navigate = useNavigate();
  const { postId } = useParams();
  const { fieldValues, handleFieldChange, setFieldValues, clearFieldValues } =
    useFieldValues({
      title: '',
      content: '',
    });

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      const url = `http://127.0.0.1:8000/blog/api/posts/${postId}/`;
      try {
        const response = await Axios.get(url);
        setFieldValues(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    if (postId) fetchPost();
    else clearFieldValues();
  }, [postId, setFieldValues, clearFieldValues]);

  const savePost = async () => {
    setLoading(true);
    setError(null);

    const url = !postId
      ? 'http://127.0.0.1:8000/blog/api/posts/'
      : `http://127.0.0.1:8000/blog/api/posts/${postId}/`;

    try {
      if (!postId) {
        await Axios.post(url, fieldValues);
      } else {
        await Axios.put(url, fieldValues);
      }
      navigate('/blogs/');
    } catch (e) {
      setError(e);
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>
        BlogPostForm
        {postId ? '<<수정>>' : '<<생성>>'}
      </h2>
      <BlogForm
        fieldValues={fieldValues}
        handleFieldChange={handleFieldChange}
        handleSubmit={savePost}
        loading={loading}
      />
      <DebugStates postId={postId} fieldValues={fieldValues} />
    </div>
  );
}

export default PageblogForm;
