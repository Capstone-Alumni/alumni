import axios from 'axios';

// ----------------------------------------------------------------------
const axiosInstance = axios.create({
  baseURL: '',
  headers: {
    'content-type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(async config => config);

axiosInstance.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    throw error;
  },
);

export default axiosInstance;
