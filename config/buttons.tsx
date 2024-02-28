// buttons.tsx
import React, { FC } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import fonts from '../config/fonts';
import SDims from '../config/dimensions';

// Define color constants
// this should eventually be moved to a config file
const COLOR_A = '#AD8457';
const COLOR_B = 'black';

interface ButtonAProps {
  title?: string;
  image?: any;
  onPress: () => void;
  color: 'A' | 'B';
}

interface ButtonBProps {
  title: string;
  onPress: () => void;
  color: 'A' | 'B';
}

interface ContainerBProps {
  children: React.ReactNode;
}

interface listButtonProps {
  name: string;
  price: string;
  onPress?: () => void;
  style?: object;
}

const styles = StyleSheet.create({
  // button styles
  buttonA: {
    paddingVertical: SDims.D20px,
    paddingHorizontal: SDims.D40px,
    backgroundColor: '#AD8457',
    borderColor: '#AD8457', 
    borderWidth: SDims.D2px,
    borderRadius: SDims.D10px,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageStyle: {
    width: SDims.D30px,  // Set your desired width
    height: SDims.D50px,  // Set your desired height
    resizeMode: 'stretch'
  },

  buttonB: {
    flexDirection: 'column',
    padding: SDims.D12px,
    borderColor: '#AD8457', 
    borderWidth: SDims.D2px,
    borderRadius: SDims.D10px, 
    height: SDims.Height10p,
    width: SDims.Width1_4f,
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerB: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: 'black'
  },

  ListButton: {
    margin: SDims.D5px,
    paddingVertical: SDims.D20px,
    paddingHorizontal: SDims.D40px,
    backgroundColor: '#AD8457',
    borderColor: '#AD8457',
    borderWidth: SDims.D2px,
    borderRadius: SDims.D10px,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: SDims.Width50p + SDims.Width5p,
  },
  
  // button text styles
  buttonAText: {
    ...fonts.txtButtonA,
  },
  buttonBText: {
    ...fonts.txtCard,
  },
  listButtonText: {
    ...fonts.txtList,
  },

  name: {
    flex: 4.2,
    textAlign: 'left',
    paddingLeft: SDims.D10px,
  },
  price: {
    flex: 1,
    textAlign: 'right',
    paddingRight: SDims.D10px,
  },

});

const ButtonA: FC<ButtonAProps> = ({ title, image, onPress, color }) => {
  const backgroundColor = color === 'A' ? COLOR_A : COLOR_B;
  return (
    <TouchableOpacity style={[styles.buttonA, { backgroundColor }]} onPress={onPress}>
      {image ? <Image source={image} style={styles.imageStyle} /> : <Text style={styles.buttonAText}>{title}</Text>}
    </TouchableOpacity>
  );
};

const ButtonB: FC<ButtonBProps> = ({ title, onPress, color }) => {
  const backgroundColor = color === 'A' ? COLOR_A : COLOR_B;
  return (
    <TouchableOpacity style={[styles.buttonB, { backgroundColor }]} onPress={onPress}>
      <Text style={styles.buttonBText}>{title}</Text>
    </TouchableOpacity>
  );
};

const ContainerB: FC<ContainerBProps> = ({ children }) => {
  return (
    <View style={styles.containerB}>
      {children}
    </View>
  );
};



const ListButton: FC<listButtonProps> = ({ name, price, onPress = () => {}, style }) => {
  return (
    <TouchableOpacity style={[styles.ListButton, style]} onPress={onPress}>
      <Text style={[styles.listButtonText, styles.name]}>{name}</Text>
      <Text style={[styles.listButtonText, styles.price]}>{price}</Text>
    </TouchableOpacity>
  );
};

const Buttons = {
  ButtonA,
  ButtonB,
  ContainerB,
  ListButton,
};

export default Buttons;
