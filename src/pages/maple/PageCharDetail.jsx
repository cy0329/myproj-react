import CharDetail from 'components/maple/CharDetail';
import { useParams } from 'react-router-dom';

function PageCharDetail() {
  const { charId } = useParams();
  return (
    <div>
      <CharDetail charId={charId} />
    </div>
  );
}
export default PageCharDetail;
