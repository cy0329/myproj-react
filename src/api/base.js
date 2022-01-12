import Axios from 'axios';
import { makeUseAxios } from 'Constants';
import { API_HOST } from 'Constants';
import { useCallback, useEffect, useState } from 'react';

const axiosInstance = Axios.create({
  baseURL: API_HOST,
});

const useApiAxios = makeUseAxios({
  axios: axiosInstance,
});

function useRequest(resourceUrl, initialState, manual = false) {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});

  // api 요청을 한 axios 인스턴스를 반환합니다. (Promise 객체)
  const request = useCallback(
    (method = 'GET', data) => {
      setLoading(true);
      setError(null);
      setErrorMessages({});

      return axiosInstance({
        method,
        url: resourceUrl,
        data,
      })
        .then((response) => {
          setData(response.data);
          return response;
        })
        .catch((error) => {
          setError(error);
          // 400 Bad Request 경우에만 에러 메세지를 저장합니다.
          if (error.response.status === 400) {
            setErrorMessages(error.response.data);
          }
          throw error;
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [resourceUrl],
  );

  useEffect(() => {
    if (!manual) request();
  }, [manual]);

  return { data, loading, error, errorMessages, request };
}

export { axiosInstance, useApiAxios, useRequest };
