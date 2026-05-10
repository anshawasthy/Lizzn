import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.VITE_API_URL || 'https://lizzn-qggx.onrender.com/api',
=======
  baseURL: 'https://lizzn-qggx.onrender.com',
>>>>>>> 9e538082441c76a4bf43cb20952172a85d65e226
  withCredentials: true,
});

export default api;
