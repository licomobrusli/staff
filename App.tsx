// App.tsx
import React from 'react';
import AppNavigator from './config/appNavigator'; // Adjust the path as necessary
import FloatingButtonProvider from './config/incidentButtonProvider'; // Adjust the path as necessary

const App = () => {
  return (
    <FloatingButtonProvider>
      <AppNavigator />
    </FloatingButtonProvider>
  );
};

export default App;
