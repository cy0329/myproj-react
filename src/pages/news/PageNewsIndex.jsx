import ArticleList from 'components/news/ArticleList';

// 뉴스 서비스의 대문 페이지
function PageNewsIndex() {
  return (
    <div>
      <h2>뉴스 페이지</h2>
      <ArticleList />
      <h2>뉴스 추천</h2>

      <h2>광고</h2>
    </div>
  );
}

export default PageNewsIndex;
