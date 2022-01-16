import { useApiAxios } from 'api/base';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import CharSelect from './CharSelect';

function CharList() {
  const navigate = useNavigate();
  const [query, setQuery] = useState(null);

  const [{ data: charList, loading, error }, refetch] = useApiAxios(
    `/maple/api/character/${query ? '?query=' + query : ''}`,
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  const getQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      refetch();
    }
  };

  return (
    <div>
      {loading && 'Loading...'}
      {error && <div>통신 중에 오류가 발생했습니다.</div>}
      <button
        onClick={() => navigate('/maple/new/')}
        className="rounded px-3 py-2 mr-3 bg-gradient-to-r from-purple-300 to-red-300 text-white hover:bg-gradient-to-r hover:from-red-300 hover:to-purple-300 hover:scale-110 hover:text-black duration-300 mb-4"
      >
        새 캐릭터 등록하기
      </button>
      <input
        type="text"
        name="query"
        onChange={getQuery}
        onKeyPress={handleKeyPress}
        className="p-2 border-2 border-purple-400 rounded-lg"
        placeholder="검색어 + Enter"
      />
      <div>
        {charList &&
          (query
            ? charList.map((char) => (
                <div className="w-full md:w-2/3 sl:2-1/3 px-2 py-1 transition-transform hover:translate-x-8 hover:scale-110 duration-200 rounded mb-1 bg-gradient-to-r from-purple-300 to-red-100">
                  <CharSelect key={char.id} char={char} />
                </div>
              ))
            : charList.map((char) => (
                <div className="w-full md:w-2/3 sl:2-1/3 px-2 py-1 transition-transform hover:translate-x-8 hover:scale-110 duration-200 rounded mb-1 bg-gradient-to-r from-purple-300 to-red-100">
                  <CharSelect key={char.id} char={char} />
                </div>
              )))}
      </div>
      <ToastContainer />
    </div>
  );
}
export default CharList;
