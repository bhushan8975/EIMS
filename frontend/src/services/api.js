import axios from "axios";

export const BASE_URL = "https://eims-backend.onrender.com";

export const api = axios.create({
  baseURL: BASE_URL,
});