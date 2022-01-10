import TopNav from 'components/TopNav';
import Login from 'pages/accounts/Login';
import Profile from 'pages/accounts/Profile';
import Components from 'pages/examples/Components';
import ReviewForm from 'pages/reviews/Reviewform';
import ReviewFormC from 'components/ReviewFormSol';
import ReviewList from 'pages/reviews/ReviewList';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import PageReviewForm from 'pages/reviews/PageReviewFormSol';
import Pageblog from 'pages/blog/Pageblog';

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
        <Route path="/blog/" element={<Pageblog />} />
      </Routes>
    </div>
  );
}

export default App;
