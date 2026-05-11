import axios from 'axios';

const api = axios.create({

  baseURL: 'https://lizzn-ggqx.onrender.com/',

  withCredentials: true,
});

export default api;
