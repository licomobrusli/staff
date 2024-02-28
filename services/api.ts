// api.ts
import axios from 'axios';
import ENV from '../config/host';

const api = axios.create({
  baseURL: ENV.API_BASE_URL, 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
  // ... other settings
});

export default api;
