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
    // Bất kỳ mã trạng thái nào nằm trong dải 2xx (Thành công) sẽ chạy vào đây
    return response;
  },
  function (error) {
    // Bất kỳ mã lỗi nào lọt ra ngoài dải 2xx (ví dụ 400, 401, 500) sẽ chạy vào đây

    // Ví dụ nghiệp vụ thực tế: Bắt lỗi 401 (Hết hạn Token hoặc Token sai)
    if (error.response && error.response.status === 401) {
      console.log("Token hết hạn, ép người dùng văng ra màn hình Đăng nhập!");
      // localStorage.removeItem("access_token");
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
export default api;
