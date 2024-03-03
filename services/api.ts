// api.ts
import axios from 'axios';
import ENV from '../config/host';

const api = axios.create({
    baseURL: ENV.API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Add this line to send and receive cookies
});

console.log('Creating API instance with base URL:', ENV.API_BASE_URL);

export default api;
