// menu.tsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import performLogout from '../config/logout';

type Props = {
    navigation: StackNavigationProp<any, any>;
};

const MenuScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bannerSpace} />

      <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Schedule')} // Adjust 'Schedule' if you use a different name
      >
          <Text style={styles.buttonText}>Schedule</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Order Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Snake</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Login')} // Use the navigation prop to navigate
      >
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => performLogout(navigation)} // Use the performLogout function when the Log Out button is pressed
      >
        <Text style={styles.buttonText}>Log Out</Text>
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
export default MenuScreen;
