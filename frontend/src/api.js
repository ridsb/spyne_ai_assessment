// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // replace with your backend URL if deployed
});

// Attach JWT token to each request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
