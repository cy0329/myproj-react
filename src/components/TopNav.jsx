import { Link } from 'react-router-dom';

function TopNav() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/accounts/login/">로그인</Link>
        </li>
        <li>
          <Link to="/accounts/profile/">프로필</Link>
        </li>
        <li>
          <Link to="/reviews/">리뷰</Link>
        </li>
      </ul>
    </div>
  );
}
export default TopNav;
