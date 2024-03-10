// menu.tsx
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import performLogout from '../config/logout';
import { SCHEDImage, SNAKEImage, LOGOUTImage } from '../images'; // Adjust the path if necessary

type Props = {
    navigation: StackNavigationProp<any, any>;
};

const MenuScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
          onPress={() => navigation.navigate('Schedule')} // Adjust 'Schedule' if you use a different name
          style={styles.touchableArea}
      >
          <Image source={SCHEDImage} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity 
          onPress={() => navigation.navigate('SnakeGame')} // Replace 'SnakeGame' with actual navigation target
          style={styles.touchableArea}
      >
          <Image source={SNAKEImage} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => performLogout(navigation)} // Use the performLogout function when the Log Out button is pressed
        style={styles.touchableArea}
      >
        <Image source={LOGOUTImage} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

// Updated styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AD8457',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableArea: {
    // Optional: Add padding or margin if needed
    margin: 20, // Adjust the spacing between the buttons
  },
  icon: {
    width: 400, // Set the new width for the icons
    height: 400, // Set the new height for the icons
    margin: 100, // Adjust the spacing between the icons
    resizeMode: 'contain', // Adjust if needed to maintain aspect ratio
  },
});

// Export the component so it can be used in other parts of your app
export default MenuScreen;
