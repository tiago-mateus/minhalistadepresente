import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error', error);
    return Promise.reject(error);
  }
);
