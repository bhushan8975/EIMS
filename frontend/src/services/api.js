import axios from "axios";

const BASE_URL = "https://eims-backend.onrender.com";

export const api = axios.create({
  baseURL: BASE_URL,
});