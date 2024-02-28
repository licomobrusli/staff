// host.ts

// const ENV = {
//   DEV: {
//     API_BASE_URL: 'http://192.168.1.17:8000/api/',
//     // ... other development environment configurations
//   },
//   PROD: {
//     API_BASE_URL: 'http://your-production-server.com/api/',
//     // ... other production environment configurations
//   }
// };
  
// First ip is for android emulator, second is for physical device in store
const ENV = {
    DEV: {
      API_BASE_URL: __DEV__ ? 'http://10.0.2.2:8000/api/' : 'http://192.168.1.148:8000/api/',
      // ... other development environment configurations
    },
    PROD: {
      API_BASE_URL: 'http://your-production-server.com/api/',
      // ... other production environment configurations
    }
  };
  
    const getEnvVariables = () => {
      // Here, we're using a simple condition, but you can extend this 
      // to choose an environment based on process variables or other conditions.
      if (__DEV__) { // __DEV__ is a global variable in React Native that's true when in development mode
        return ENV.DEV;
      } else {
        return ENV.PROD;
      }
    };
    
    export default getEnvVariables();
    