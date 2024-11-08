import axios from 'axios';
import { env } from './env';

export const axiosClient = axios.create({
  baseURL: env.API_URL || 'http://localhost:3000',
});
