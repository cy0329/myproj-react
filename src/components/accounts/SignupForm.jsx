import { useApiAxios } from 'api/base';
import DebugStates from 'components/DebugStates';
import LoadingIndicator from 'components/LoadingIndicator';
import useFieldValues from 'hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const INIT_FIELD_VALUES = {
  username: '',
  password: '',
  password2: '',
};

function SignupForm() {
  const navigate = useNavigate();
  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FIELD_VALUES);
  const [{ loading, error, errorMessages, non_field_errors }, signupRequest] =
    useApiAxios(
      {
        url: '/accounts/api/signup/',
        method: 'POST',
      },
      { manual: true },
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    signupRequest({
      data: fieldValues,
    }).then(() => {
      toast.success('회원가입 성공! 로그인해주세요!!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/accounts/login/');
    });
  };

  return (
    <div>
      <h2>회원가입 폼</h2>
      <form onSubmit={handleSubmit}>
        {loading && <LoadingIndicator>Loading...</LoadingIndicator>}
        {error &&
          `에러가 발생했습니다. ${error.response?.status} ${error.response?.statusText}`}
        <h2>ID를 입력해주세요.</h2>
        <input
          type="text"
          name="username"
          value={fieldValues.username}
          onChange={handleFieldChange}
          className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 mb-2"
        />
        {errorMessages.username?.map((message, index) => (
          <p key={index} className="text-sm text-red-500">
            {message}
          </p>
        ))}
        <h2>비밀번호를 입력해주세요.</h2>
        <input
          type="password"
          name="password"
          value={fieldValues.password}
          onChange={handleFieldChange}
          className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 mb-2"
        />
        {errorMessages.password?.map((message, index) => (
          <p key={index} className="text-sm text-red-500">
            {message}
          </p>
        ))}
        <h2>비밀번호를 한 번 더 입력해주세요.</h2>
        <input
          type="password"
          name="password2"
          value={fieldValues.password2}
          onChange={handleFieldChange}
          className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-300 mb-2"
        />
        {errorMessages.password2?.map((message, index) => (
          <p key={index} className="text-sm text-red-500">
            {message}
          </p>
        ))}
        {errorMessages.non_field_errors?.map((message, index) => (
          <p key={index} className="text-sm text-red-500">
            {message}
          </p>
        ))}
        {non_field_errors?.response?.error}
        <button className="p-2 rounded-lg bg-blue-700 hover:bg-purple-500 text-white hover:text-black block">
          회원가입
        </button>
      </form>
      <DebugStates fieldValues={fieldValues} />
    </div>
  );
}

export default SignupForm;
