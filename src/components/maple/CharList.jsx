import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CharSelect from './CharSelect';

function CharList() {
  const navigate = useNavigate();

  const [{ data: charList, loading, error }, refetch] = useApiAxios(
    '/maple/api/character/',
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <button
        onClick={() => navigate('/maple/new/')}
        className="rounded px-3 py-2 bg-gradient-to-r from-purple-300 to-red-300 text-white hover:bg-gradient-to-r hover:from-red-300 hover:to-purple-300 hover:scale-110 duration-300 mb-4"
      >
        새 캐릭터 등록하기
      </button>
      {loading && 'Loading...'}
      {error && <div>통신 중에 오류가 발생했습니다.</div>}
      <div>
        {charList &&
          charList.map((char) => (
            <div className="w-full md:w-2/3 sl:2-1/3 px-2 py-1 transition-transform hover:translate-x-8 hover:scale-110 duration-200 rounded mb-1 bg-gradient-to-r from-purple-300 to-red-100">
              <CharSelect key={char.id} char={char} />
            </div>
          ))}
      </div>
    </div>
  );
}
export default CharList;
