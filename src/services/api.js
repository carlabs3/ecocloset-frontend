import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data) => api.post("/api/auth/register", data);
export const loginUser = (data) => api.post("/api/auth/login", data);
export const createResult = (data) => api.post("/api/results", data);
export const getResults = () => api.get("/api/results");
export const getResultById = (id) => api.get(`/api/results/${id}`);
export const deleteResult = (id) => api.delete(`/api/results/${id}`);
