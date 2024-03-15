// apiCalls.ts
import api from '../services/api';
import ENV from '../config/host';
import axios from 'axios';

interface ErrorResponse {
  errors: { [key: string]: string[] };
}

export const register = async (username: string, password: string) => {
  try {
      console.log('Base URL REG:', ENV.API_BASE_URL);
      console.log('Sending registration request:', { username, password1: password, password2: password });
      const response = await api.post('/register/', {
          username,
          password1: password,
          password2: password,
      });
      console.log('Registration response:', response.data);
      return response.data;
  } catch (error) {
      if (axios.isAxiosError(error)) {
          console.error('Registration API Error:', error.response?.data);
          // Use the ErrorResponse interface to ensure the structure of error data
          const errorResponse = error.response?.data as ErrorResponse;
          let errorMessage = 'Registration failed: ';
          if (errorResponse && errorResponse.errors) {
              // Safely iterate over errors now that TypeScript knows their structure
              errorMessage += Object.entries(errorResponse.errors)
                  .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                  .join('; ');
          } else {
              errorMessage += 'Please check your details and try again.';
          }
          throw new Error(errorMessage);
      } else {
          console.error('Unexpected Error:', error);
          throw new Error('Registration failed');
      }
  }
};

export const login = async (username: string, password: string) => {
    try {
        console.log('1. Base URL LOG:', ENV.API_BASE_URL);
        console.log(`2. Attempting to log in with username: ${username}`);
        const response = await api.post('/login/', {
            username,
            password,
        }); 
        console.log('3. Login response:', response.data);       
      return response.data;
    } catch (error) {
      console.log('4. Login request failed', error);
      if (error instanceof Error) {
        // Handle the error based on your API's error structure
        console.error('5. Login Error:', error.message);
        throw new Error('6. Login failed: ${error.message}');
      } else {
        // If it's not an instance of Error, it could be a different type like a string or an object
        console.error('7. Login Error:', error);
        throw new Error('8. Login failed');
      }
    }
  };
  
  export const logout = async () => {
    try {
        console.log('Base URL LOGOUT:', ENV.API_BASE_URL);
        const response = await api.post('/logout/'); // Adjust if your backend uses a different path
        console.log('Logout response:', response.data);
        return response.data;
    } catch (error) {
        console.log('Logout request failed', error);
        if (axios.isAxiosError(error)) {
            // Handle the error based on your API's error structure
            console.error('Logout Error:', error.response?.data);
            throw new Error('Logout failed: ' + error.response?.data?.detail);
        } else if (error instanceof Error) {
            // If the error is an instance of Error, extract and throw its message
            console.error('Logout Error:', error.message);
            throw new Error(`Logout failed: ${error.message}`);
        } else {
            // If it's not an instance of Error, log and throw a generic logout failed message
            console.error('Unexpected Error:', error);
            throw new Error('Logout failed');
        }
    }
};

export const getTimeResourcesQueue = async (token: string) => {
    try {
        const response = await api.get('/user-time-resources/', {
            headers: { Authorization: `Token ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching time resources:', error);
        throw new Error('Failed to fetch time resources');
    }
};

export const updateTimeResource = async (token: string, timeResourceId: number, staffStart: string, staffEnd: string, staffTimer: number) => {
    try {
        const response = await api.patch(`/user-time-resources/${timeResourceId}/`, {
            staff_start: staffStart,
            staff_end: staffEnd,
            staff_timer: staffTimer
        }, {
            headers: { Authorization: `Token ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating time resource:', error);
        throw new Error('Failed to update time resource');
    }
};

export const getOrderAssignments = async (token: string, orderNumber: string) => {
    try {
        console.log('Sending request to backend with parameters:', { orderNumber });
        console.log('Headers:', { Authorization: `Token ${token}` });

        const response = await api.get(`/assignments/`, {
            params: { order_number: orderNumber }, // Changed from orderNumber to order_number
            headers: { Authorization: `Token ${token}` }
        });
        
        return response.data;
    } catch (error) {
        console.error('Error fetching assignments:', error);
        throw new Error('Failed to fetch assignments');
    }
};

