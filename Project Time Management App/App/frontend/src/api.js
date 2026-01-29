import axios from "axios";

/**
 * Central Axios instance for API calls
 * - Uses env variable in production (Vercel)
 * - Falls back to localhost for local development
 */
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Automatically attach JWT token to every request
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
