import Axios from 'axios';
import { API_HOST } from 'Constants';

const axiosInstance = Axios.create({ baseURL: API_HOST });
export { axiosInstance };
