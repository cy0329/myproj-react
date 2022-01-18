// input[type=text]     name=username
// input[type=password] name=password
// userFieldValues 훅 쓰고
// PageLogin 컴포넌트 내에서 fieldVqlues 상탯값 노출

import { useApiAxios } from 'api/base';
import DebugStates from 'components/DebugStates';
import useAuth from 'hooks/useAuth';
import useFieldValues from 'hooks/useFieldValues';
import useLocalStarage from 'hooks/useLocalStarage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const INIT_FIELD_VALUES = {
  username: '',
  password: '',
};

function LoginForm() {
  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FIELD_VALUES);
  const navigate = useNavigate();

  const [auth, , login] = useAuth();

  const [{ loading, error }, loginRequest] = useApiAxios(
    {
      url: `/accounts/api/token/`,
      method: 'POST',
    },
    { manual: true },
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    loginRequest({ data: fieldValues }).then((response) => {
      const { access, refresh, username, first_name, last_name } =
        response.data;
      login({
        access,
        refresh,
        username,
        first_name,
        last_name,
      });
      console.log('access :', access);
      console.log('refresh :', refresh);
      console.log('username :', username);
      console.log('first_name :', first_name);
      console.log('last_name :', last_name);
      navigate('/');
    });
  };

  return (
    <div>
      <h2>Login</h2>

      {error?.response?.status === 401 && (
        <div className="text-red-400">로그인에 실패했습니다.</div>
      )}

      <h2>username</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={fieldValues.username}
          onChange={handleFieldChange}
          placeholder="ID를 입력해주세요"
          className="p-2 border-2 focus:outline-none focus:border-blue-400 rounded-lg mb-2"
        />

        <h2>password</h2>
        <input
          type="password"
          name="password"
          value={fieldValues.password}
          onChange={handleFieldChange}
          placeholder="PassWord"
          className="p-2 border-2 focus:outline-none focus:border-blue-400 rounded-lg  mb-2"
        />
        <div>
          <button className="rounded-lg bg-blue-700 hover:bg-purple-300 p-2 text-lg text-white hover:text-black">
            로그인
          </button>
        </div>
      </form>
      <DebugStates
        username={fieldValues.username}
        password={fieldValues.password}
        auth={auth}
      />
      {/* <div>ID : {fieldValues.username}</div>
      <div>PW : {fieldValues.password}</div> */}
      <ToastContainer />
    </div>
  );
}

export default LoginForm;
