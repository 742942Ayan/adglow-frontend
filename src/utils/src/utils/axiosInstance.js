// src/utils/axiosInstance.js
import axios from 'axios';

// Token ko localStorage se read karo
const token = localStorage.getItem("adglow_token");

// Axios instance create karo
const axiosInstance = axios.create({
  baseURL: 'https://adglow-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '', // token lagao agar mila to
  },
});

// Har request se pehle token update karne ke liye interceptor
axiosInstance.interceptors.request.use((config) => {
  const newToken = localStorage.getItem("adglow_token");
  if (newToken) {
    config.headers.Authorization = `Bearer ${newToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
