import axios from "axios";

const API_URL = "http://0.0.0.0:8000";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("access_token");

  config.headers.authorization = `Bearer ${localStorage}`;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
