import PageBlogDetail from 'pages/blog/PageblogDetail';
import DebugStates from 'components/DebugStates';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosInstance, useApiAxios } from 'api/base';
import useFieldValues from 'hooks/useFieldValues';
import PostSummary from './PostSummary';

function PostList() {
  const navigate = useNavigate();
  const [{ data: postList, loading, error }, refetch] =
    useApiAxios('/blog/api/posts/');

  useEffect(() => {
    refetch();
  }, []);

  const { fieldValues, handleFieldChange } = useFieldValues('');

  // 검색 기능 새로 해보기
  // const queryPost = (e) => {
  //   const query = fieldValues.query;
  //   if (e.key === 'Enter') {
  //     if (query === '') {
  //       refetch();
  //     } else {
  //       const url = `/blog/api/posts/`;
  //       axiosInstance
  //         .get(url)
  //         .then(({ data }) => {
  //           console.log(data);
  //           postList.filter(({ title }) => title.indexOf(query) > 0);
  //         })
  //         .catch((error) => console.log(error));
  //     }
  //   }
  // };
  return (
    <div className="bg-slate-200 p-3 rounded shadow">
      <h2 className="text-lg font-extrabold">블로그 포스팅</h2>
      {/* 검색 기능 구현해보기 */}
      {/* <input
        name="query"
        value={fieldValues.query}
        className="block rounded w-full py-1 px-2 border border-black mb-2"
        placeholder="검색어를 입력해주세요."
        onChange={(e) => handleFieldChange(e)}
        onKeyPress={(e) => queryPost(e)}
      /> */}
      {loading && <div>Loading...</div>}
      {error && <div>통신 중에 오류가 발생했습니다.</div>}
      <div className="mb-2">
        <button
          onClick={() => refetch()}
          className="bg-yellow-400 hover:bg-red-300 mr-2 rounded p-2"
        >
          새로고침
        </button>
        <button
          onClick={() => navigate('/blogs/new/')}
          className="bg-blue-400 hover:bg-slate-400 rounded p-2"
        >
          새 포스팅
        </button>
      </div>
      {postList &&
        postList.map((post) => (
          <PostSummary
            key={post.id}
            post={post}
            // handleEdit={() => editPost(post)}
            // handleDelete={() => deletePost(post)}
          />
        ))}
      <div className="mb-2"></div>
      <DebugStates loading={loading} error={error} postList={postList} />
    </div>
  );
}
export default PostList;
