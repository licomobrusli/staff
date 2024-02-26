/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';
import Menu from './screens/menu'; // Adjust the path as necessary

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <Menu />
    </SafeAreaView>
  );
}

export default App;
