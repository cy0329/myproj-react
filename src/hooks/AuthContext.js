import { createContext, useCallback, useContext } from 'react';
import useLocalStarage from './useLocalStarage';

// context 객체를 생성
const AuthContext = createContext();

const INITIAL_AUTH = { isLoggedIn: false };

// Provider를 함수로 만들어주어 다른 컴포넌트에서 사용 가능하도록
function AuthContextProvider({ children }) {
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

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// provider를 걸어준 후 그 context를 사용하기 위한 함수 (consumer)
function useAuthContext() {
  return useContext(AuthContext);
}

// Provider와 consumer 두 가지를 모두 export
export { AuthContextProvider, useAuthContext };
