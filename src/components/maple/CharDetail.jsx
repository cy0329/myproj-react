import { useApiAxios } from 'api/base';
import LoadingIndicator from 'components/LoadingIndicator';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CharDetail({ charId }) {
  const [{ data: character, loading, error }, refetch] = useApiAxios(
    `/maple/api/character/${charId}/`,
    { manual: true },
  );

  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, []);

  const [{ loading: deleteLoading, error: deleteError }, deleteChar] =
    useApiAxios(
      {
        url: `/maple/api/character/${charId}/`,
        method: 'DELETE',
      },
      { manual: true },
    );

  const handleDelete = () => {
    if (window.confirm('정말 삭제하겠습니까?')) {
      deleteChar().then(() => {
        navigate(`/maple/`);
        toast.success('삭제가 완료되었습니다.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }
  };

  return (
    <>
      <div className="mb-5">
        {loading && <LoadingIndicator>삭제 중</LoadingIndicator>}
        {deleteLoading && <LoadingIndicator>삭제 중</LoadingIndicator>}
        {error &&
          `로딩 중 에러가 발생했습니다. (${error.response.status} ${error.response.stateText})`}
        {deleteError &&
          `삭제 요청 중 에러가 발생했습니다. (${deleteError.response.status} ${deleteError.response.statusText})`}

        <div className="px-1 pb-3 shadow-lg shadow-purple-200 rounded-lg">
          {character && (
            <>
              <h1 className="text-center text-extrabold text-2xl underline underline-offset-4 mb-3">
                {character.job}
              </h1>
              {character.photo && (
                <img
                  src={character.photo}
                  alt="등록된 사진이 없습니다."
                  className="rounded-lg mb-2 mx-auto shadow"
                />
              )}
              <div className="shadow-lg shadow-purple-200 hover:bg-purple-50 px-2 py-1 rounded-lg border-gray-800 mx-2 mb-3">
                {character.description.split('\n').map((letter) => (
                  <>
                    {letter}
                    <br />
                  </>
                ))}
              </div>
              {/* 테이블 시작 */}
              <table>
                <tr className="">
                  {character.invincibility ? (
                    <>
                      <td className="p-2">
                        <h3 className="inline">무적기</h3>
                      </td>

                      <td className="p-2">
                        <h3 className="inline px-2 py-1 rounded bg-blue-500 text-white">
                          Yes!
                        </h3>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2">
                        <h3 className="inline">무적기</h3>
                      </td>
                      <td className="p-2">
                        <h3 className="inline px-2 py-1 rounded bg-red-500 text-white">
                          No..
                        </h3>
                      </td>
                    </>
                  )}
                  {character.bind ? (
                    <>
                      <td className="p-2">
                        <h3 className="inline">바인드</h3>
                      </td>
                      <td className="p-2">
                        <h3 className="inline px-2 py-1 rounded bg-blue-500 text-white">
                          Yes!
                        </h3>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2">
                        <h3 className="inline">바인드</h3>
                      </td>
                      <td className="p-2">
                        <h3 className="inline px-2 py-1 rounded bg-red-500 text-white">
                          No..
                        </h3>
                      </td>
                    </>
                  )}
                </tr>
                <tr>
                  {character.rush ? (
                    <>
                      <td className="p-2">
                        <h3 className="inline">돌진기</h3>
                      </td>
                      <td className="p-2">
                        <h3 className="inline px-2 py-1 rounded bg-blue-500 text-white">
                          Yes!
                        </h3>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2">
                        <h3 className="inline">돌진기</h3>
                      </td>
                      <td className="p-2">
                        <h3 className="inline px-2 py-1 rounded bg-red-500 text-white">
                          No..
                        </h3>
                      </td>
                    </>
                  )}
                  {character.teleport ? (
                    <>
                      <td className="p-2">
                        <h3 className="inline">텔레포트</h3>
                      </td>
                      <td className="p-2">
                        <h3 className="inline px-2 py-1 rounded bg-blue-500 text-white">
                          Yes!
                        </h3>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2">
                        <h3 className="inline">텔레포트</h3>
                      </td>
                      <td className="p-2">
                        <h3 className="inline px-2 py-1 rounded bg-red-500 text-white">
                          No..
                        </h3>
                      </td>
                    </>
                  )}
                </tr>
              </table>
              <h2 className="border-2 border-purple-400 rounded text-xl text-extrabold inline px-2 mx-2">
                사냥 능력 : {character.hunt_rating} 점
              </h2>
              <h2 className="border-2 border-purple-400 rounded text-xl text-extrabold inline px-2 mx-2">
                보스 성능 : {character.raid_rating} 점
              </h2>
            </>
          )}
        </div>
      </div>
      <button
        onClick={() => navigate('/maple/')}
        className="rounded px-3 py-2 bg-gradient-to-b from-purple-300 to-red-300 text-white hover:bg-gradient-to-b hover:from-red-300 hover:to-purple-300 hover:scale-110 duration-300 mb-4 mx-2 w-20 hover:text-black"
      >
        Home
      </button>
      <button
        onClick={() => navigate(`/maple/${charId}/edit/`)}
        className="rounded px-3 py-2 bg-gradient-to-b from-purple-300 to-red-300 text-white hover:bg-gradient-to-b hover:from-red-300 hover:to-purple-300 hover:scale-110 duration-300 mb-4 mx-2 w-20 hover:text-black"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete()}
        className="rounded px-3 py-2 bg-gradient-to-b from-purple-300 to-red-300 text-white hover:bg-gradient-to-b hover:from-red-300 hover:to-purple-300 hover:scale-110 duration-300 mb-4 mx-2 w-20 hover:text-black"
      >
        Delete
      </button>
    </>
  );
}

export default CharDetail;
