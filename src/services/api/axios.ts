import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // This allows sending cookies with requests
});

api.interceptors.response.use(
  (response) => {
    
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
