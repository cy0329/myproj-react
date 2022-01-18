import useLocalStarage from './useLocalStarage';

const INITIAL_AUTH = { isLoggedIn: false };

function useAuth() {
  const [auth, setAuth] = useLocalStarage('auth', INITIAL_AUTH);
  return [auth, setAuth];
}
export default useAuth;
