import axios from "axios";

const api = axios.create({
  baseURL: "https://task-api-production-5152.up.railway.app",
});

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login = (username, password) =>
  api.post("/auth/login", { username, password });

export const getMe = () => api.get("/auth/me");

export const getTasks = () => api.get("/tasks/");
export const createTask = (title, description) =>
  api.post("/tasks/", { title, description });
export const completeTask = (id) => api.patch(`/tasks/${id}/complete`);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);