import './App.css';
import TopNav from 'components/TopNav';
import Login from 'pages/accounts/Login';
import Profile from 'pages/accounts/Profile';
import Components from 'pages/examples/Components';
import ReviewForm from 'pages/reviews/Reviewform';
import ReviewList from 'pages/reviews/ReviewList';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageReviewForm from 'pages/reviews/PageReviewFormSol';
import PageblogList from 'pages/blog/PageblogList';
import PageblogForm from 'pages/blog/PageblogForm';
import PostDetail from 'components/blog/PostDetail';

function App() {
  return (
    <div className="app">
      <TopNav />
      <Routes>
        <Route path="/" element={<Navigate to="/reviews/" />} />
        <Route path="/accounts/login/" element={<Login />} />
        <Route path="/accounts/profile/" element={<Profile />} />
        <Route path="/reviews/" element={<ReviewList />} />
        {/* 솔루션 방식(스타일링 거의 없음) */}
        <Route path="/reviews/new/" element={<PageReviewForm />} />
        <Route path="/reviews/:reviewId/edit/" element={<PageReviewForm />} />

        {/* 내 방식 */}
        {/* <Route path="/reviews/new/" element={<ReviewForm />} />
        <Route path="/reviews/:reviewId/edit/" element={<ReviewForm />} /> */}
        <Route path="/examples/components/" element={<Components />} />

        {/* 여기부터 블로그 */}
        <Route path="/blogs/" element={<PageblogList />} />
        <Route path="/blogs/new/" element={<PageblogForm />} />
        <Route path="/blogs/:blogId/" element={<PostDetail />} />
        <Route path="/blogs/:blogId/edit/" element={<PageblogForm />} />
      </Routes>
    </div>
  );
}

export default App;
