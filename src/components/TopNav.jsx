import useAuth from 'hooks/useAuth';
import { Link, NavLink } from 'react-router-dom';

function TopNav() {
  const [auth, , , logout] = useAuth();
  return (
    <div className="my-5">
      <div className="flex gap-4">
        {!auth.isLoggedIn && (
          <>
            <MyLink to="/accounts/login/">로그인</MyLink>
            <MyLink to="/accounts/signup/">회원가입</MyLink>
          </>
        )}
        {auth.isLoggedIn && (
          <>
            <button onClick={() => logout()} className={baseClassName}>
              로그아웃
            </button>
            <MyLink to="/accounts/profile/">프로필</MyLink>
          </>
        )}

        <MyLink to="/reviews/">리뷰</MyLink>
        <MyLink to="/blogs/">블로그</MyLink>
        <MyLink to="/news/">뉴스</MyLink>
        <MyLink to="/maple/">Maple</MyLink>
      </div>
      {/* <li>
          <MyLink to="/examples/components/">컴포넌트 예시</MyLink>
        </li>
        <li>
          <MyLink to="/examples/clock/">시계</MyLink>
        </li>
        <li>
          <MyLink to="/examples/css-module/">CssModule</MyLink>
        </li>
        <li>
          <MyLink to="/examples/css-in-js/">CssInJs</MyLink>
        </li>
        <li>
          <MyLink to="/examples/context-api/">ContextApiSample</MyLink>
        </li>
        <li>
          <MyLink to="/examples/context-api-2/">ContextApiSample2</MyLink>
        </li> */}
    </div>
  );
}

function MyLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        baseClassName +
        ' ' +
        (isActive ? 'border-purple-300 border-b-4' : 'border-white  ')
      }
    >
      {children}
    </NavLink>
  );
}

const baseClassName =
  'w-40 text-center py-2 font-semibold hover:border-purple-200 hover:bg-purple-200 hover:text-white rounded-lg';

export default TopNav;
