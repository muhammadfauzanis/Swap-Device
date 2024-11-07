import axios from 'axios';

export const AxiosInstance = axios.create({
  baseURL: process.env.API_URL,
});
