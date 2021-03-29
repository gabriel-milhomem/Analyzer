import axios from 'axios';

const baseUrl = process.env.API_BASE_URL!;

const api = axios.create({
  baseURL: `${baseUrl}/api/`
});

export default api;
