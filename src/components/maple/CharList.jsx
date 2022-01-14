import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import CharSelect from './CharSelect';

function CharList() {
  const [{ data: charList, loading, error }, refetch] = useApiAxios(
    '/maple/api/character/',
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <h2>캐릭터 목록 보여주기</h2>
      {loading && 'Loading...'}
      {error && <div>통신 중에 오류가 발생했습니다.</div>}
      <div>
        {charList &&
          charList.map((char) => (
            <div className="w-full sl:2-1/3 px-2 py-1 transition-transform hover:translate-x-4 duration-300 rounded mb-1 bg-gradient-to-r from-purple-300 to-red-100">
              <CharSelect key={char.id} char={char} />
            </div>
          ))}
      </div>
    </div>
  );
}
export default CharList;
