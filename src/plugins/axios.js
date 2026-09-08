import axios from "axios";

const API_URL = "http://0.0.0.0:8000";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {

    if (error.response && error.response.status === 401) {
      console.log("Token hết hạn, ép người dùng văng ra màn hình Đăng nhập!");
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
export default api;
