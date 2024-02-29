// apiCalls.ts
import api from '../services/api';
import ENV from '../config/host';
import axios from 'axios';

export const register = async (username: string, password: string) => {
    try {
        console.log('Base URL REG:', ENV.API_BASE_URL);
        console.log('Sending registration request:', { username, password1: password, password2: password });
        const response = await api.post('/register/', {
            username,
            password1: password,  // Changed from 'password'
            password2: password,  // Added field to match Django's expected format
        });
        console.log('Registration response:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Registration API Error:', error.response?.data);
            throw new Error(`Registration failed: ${error.response?.data.detail}`);
        } else {
            console.error('Unexpected Error:', error);
            throw new Error('Registration failed');
        }
    }
};

export const login = async (username: string, password: string) => {
    try {
        console.log('Base URL LOG:', ENV.API_BASE_URL); 
        const response = await api.post('/register/', {
            username,
            password,
        });        
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        // Handle the error based on your API's error structure
        console.error('Login Error:', error.message);
        throw new Error(`Login failed: ${error.message}`);
      } else {
        // If it's not an instance of Error, it could be a different type like a string or an object
        console.error('Login Error:', error);
        throw new Error('Login failed');
      }
    }
  };
  