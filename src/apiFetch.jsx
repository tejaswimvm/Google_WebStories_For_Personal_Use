import axios from "axios";

// Create a new Axios instance
const apiFetch = axios.create({
  baseURL: `${import.meta.env.VITE_API_ROUTE}/v1`, // Replace with your API's base URL
});

// Add an interceptor to set the authorization header if a token is stored in local storage
apiFetch.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Replace 'token' with the key where your token is stored
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // Must be used for cookie authenication
// axiosInstance.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default apiFetch;
