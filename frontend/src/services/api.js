import axios from "axios";

export const BASE_URL = "https://eims-backend.onrender.com";

export const api = axios.create({
  baseURL: BASE_URL,
});

// ✅ attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});