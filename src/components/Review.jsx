import Rating from './Rating';

// review : 보여질 리뷰 객체
// handleDelete : 인자 없는 함수, 삭제 버튼 클릭 시에 호출됨
function Review({ review, handleEdit, handleDelete }) {
  const { content, score } = review;

  // TODO : handleEdit, handleDelete 호출에 대한 방어적 코드 작성

  return (
    <div className="bg-yellow-100 border border-yellow-400 my-1 p-1">
      <div>
        <span
          onClick={() => handleEdit()}
          className="hover:text-blue-400 cursor-pointer mr-1"
        >
          수정
        </span>
        <span
          onClick={() => handleDelete()}
          className="hover:text-red-400 cursor-pointer mr-1"
        >
          삭제
        </span>
      </div>
      {content}
      <Rating score={score} />
    </div>
  );
}

export default Review;
