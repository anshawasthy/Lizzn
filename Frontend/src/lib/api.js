import axios from 'axios';

const api = axios.create({

  baseURL: 'https://lizzn-qggx.onrender.com/api',

  withCredentials: true,
});

export default api;
