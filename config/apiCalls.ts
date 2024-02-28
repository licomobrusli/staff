// apiCalls.ts
import api from '../services/api';

export const login = async (username: string, password: string) => {
    try {
      const response = await api.post('/api/login', {
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
  