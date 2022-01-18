import { useCallback } from 'react';
import useLocalStarage from './useLocalStarage';

const INITIAL_AUTH = { isLoggedIn: false };

function useAuth() {
  const [auth, setAuth] = useLocalStarage('auth', INITIAL_AUTH);

  // 로그인과 로그아웃에 대한 관리성 증대를 위한 코드
  const login = useCallback(
    ({ access, refresh, username, first_name, last_name }) => {
      setAuth({
        isLoggedIn: true,
        access,
        refresh,
        username,
        first_name,
        last_name,
      });
    },
    [setAuth],
  );

  const logout = useCallback(() => {
    setAuth({
      isLoggedIn: false,
    });
  }, [setAuth]);

  return [auth, setAuth, login, logout];
}
export default useAuth;
