// Import necessary components from React and React Native libraries
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';

// Get the screen's width to calculate button and space sizes
const { width } = Dimensions.get('window');

// Define a functional component for the menu screen
const Menu: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bannerSpace} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Schedule</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Order Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Snake</Text>
      </TouchableOpacity>
    </View>
  );
};

// Define the styles for the screen and components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerSpace: {
    width: '100%',
    height: '33%', // Approx 1/3 of the total screen height
    backgroundColor: 'black', // This will be the background for your banner image
  },
  button: {
    width: '80%', // Buttons are 80% of the screen width
    margin: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

// Export the component so it can be used in other parts of your app
export default Menu;
