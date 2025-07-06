import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.adglow.in', // ✅ Replace with real backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
