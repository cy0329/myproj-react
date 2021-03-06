import './App.css';
import TopNav from 'components/TopNav';
import PageLogin from 'pages/accounts/PageLogin';
import Profile from 'pages/accounts/PageProfile';
import Components from 'pages/examples/Components';
import ReviewForm from 'pages/reviews/Reviewform';
import ReviewList from 'pages/reviews/ReviewList';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageReviewForm from 'pages/reviews/PageReviewFormSol';
import PageblogList from 'pages/blog/PageblogList';
import PageblogForm from 'pages/blog/PageblogForm';
import Clock from 'pages/examples/Clock';
import useWindowWidth from 'hooks/useWindowWidth';
import CssModule from 'pages/examples/CssModule';
import CssInJs from 'pages/examples/CssInJs';
import ContextApiSample from 'pages/examples/ContextAPISample';
import ContextApiSample2 from 'pages/examples/ContextApiSample2';
import PageNewsIndex from 'pages/news/PageNewsIndex';
import PageNewsArticleDetail from 'pages/news/PageNewsArticleDetail';
import PageNewsArticleForm from 'pages/news/PageNewsArticleForm';
import PageBlogDetail from 'pages/blog/PageblogDetail';
import PageCharList from 'pages/maple/PageCharList';
import PageCharDetail from 'pages/maple/PageCharDetail';
import PageCharForm from 'pages/maple/PageCharForm';
import SignupForm from 'components/accounts/SignupForm';
import { AuthContextProvider } from 'hooks/AuthContext';

function App() {
  // const windowWidth = useWindowWidth();
  return (
    <>
      {/* app.js 전역에 Provider로 context객체의 내용을 제공함으로써 
    Route에 element로 지정된 컴포넌트들이 전부 사용할 수 있음 */}
      <AuthContextProvider>
        <div className="app">
          <TopNav />
          <Routes>
            <Route path="/" element={<Navigate to="/accounts/login/" />} />
            <Route path="/accounts/login/" element={<PageLogin />} />
            <Route path="/accounts/profile/" element={<Profile />} />
            <Route path="/accounts/signup/" element={<SignupForm />} />

            {/* 샵(리뷰) */}
            <Route path="/reviews/" element={<ReviewList />} />
            {/* 솔루션 방식(스타일링 거의 없음) */}
            <Route path="/reviews/new/" element={<PageReviewForm />} />
            <Route
              path="/reviews/:reviewId/edit/"
              element={<PageReviewForm />}
            />
            {/* 내 방식 */}
            {/* <Route path="/reviews/new/" element={<ReviewForm />} />
        <Route path="/reviews/:reviewId/edit/" element={<ReviewForm />} /> */}

            {/* 블로그(포스트) */}
            <Route path="/blogs/" element={<PageblogList />} />
            <Route path="/blogs/new/" element={<PageblogForm />} />
            <Route path="/blogs/:postId/" element={<PageBlogDetail />} />
            <Route path="/blogs/:postId/edit/" element={<PageblogForm />} />

            {/* 뉴스(아티클) */}
            <Route path="/news/" element={<PageNewsIndex />} />
            <Route path="/news/new" element={<PageNewsArticleForm />} />
            <Route
              path="/news/:articleId/"
              element={<PageNewsArticleDetail />}
            />
            <Route
              path="/news/:articleId/edit"
              element={<PageNewsArticleForm />}
            />

            {/* 메이플(캐릭터) */}
            <Route path="/maple/" element={<PageCharList />} />
            <Route path="/maple/:charId/" element={<PageCharDetail />} />
            <Route path="/maple/new/" element={<PageCharForm />} />
            <Route path="/maple/:charId/edit/" element={<PageCharForm />} />

            {/* examples */}
            {/* <Route path="/examples/components/" element={<Components />} />
          <Route path="/examples/css-module/" element={<CssModule />} />
          <Route path="/examples/css-in-js/" element={<CssInJs />} />
          <Route path="/examples/context-api/" element={<ContextApiSample />} />
          <Route
            path="/examples/context-api-2/"
            element={<ContextApiSample2 />}
          /> */}
          </Routes>
          {/* <hr />
        윈도우 가로크기 : {windowWidth}px */}
        </div>
      </AuthContextProvider>
      {/* <Routes>
        <Route path="/examples/clock/" element={<Clock />} />
      </Routes> */}
    </>
  );
}

export default App;
