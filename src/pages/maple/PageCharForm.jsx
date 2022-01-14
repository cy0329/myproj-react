import { useApiAxios } from 'api/base';
import LoadingIndicator from 'components/LoadingIndicator';
import CharForm from 'components/maple/CharForm';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function PageCharForm() {
  const { charId } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <h2>페이지 캐릭터 폼</h2>
      <CharForm
        charId={charId}
        handleDidSave={(savedPost) => navigate(`/maple/${savedPost.id}/`)}
      />
    </div>
  );
}

export default PageCharForm;
