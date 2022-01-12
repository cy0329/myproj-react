import Button from 'components/Button';
import H2 from 'components/H2';
import ArticleList from 'components/news/ArticleList';
import { useNavigate } from 'react-router-dom';

// 뉴스 서비스의 대문 페이지
function PageNewsIndex() {
  const navigate = useNavigate();
  return (
    <div>
      <H2>뉴스 페이지</H2>
      <ArticleList />

      <Button
        onClick={() => {
          navigate('/news/new/');
        }}
      >
        새 포스팅 쓰기
      </Button>

      <h2>뉴스 추천</h2>

      <h2>광고</h2>
    </div>
  );
}

export default PageNewsIndex;
