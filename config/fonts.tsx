// fonts.tsx
import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
// WorkSans available weights:
  // Black, ExtraBold, Bold, SemiBold, Medium, Regular (name: WorkSans), Light, ExtraLight, Thin, Hairline

// Get screen width
const screenWidth = Dimensions.get('window').width;

// Base screen width for scaling
const baseScreenWidth = 1440;

// Function to calculate adaptive font size
const adaptiveFontSize = (baseSize: number) => {
  const scaleFactor = PixelRatio.getFontScale(); // Gets the device font scale factor
  return (screenWidth / baseScreenWidth) * baseSize / scaleFactor;
};

const fonts = StyleSheet.create({
  txtBanner: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'WorkSansSemiBold',
    fontSize: adaptiveFontSize(80),
    letterSpacing: adaptiveFontSize(4),
    color: '#AD8457',
    textTransform: 'uppercase',
  },
  
  txtButtonA: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'WorkSansSemiBold',
    fontSize: adaptiveFontSize(40),
    letterSpacing: adaptiveFontSize(4),
    color: 'white',
  },

  txtList: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'WorkSansSemiBold',
    fontSize: adaptiveFontSize(40),
    letterSpacing: adaptiveFontSize(4),
    color: 'white',
  },
  
  txtCard: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'WorkSansBold',
    fontSize: adaptiveFontSize(60),
    letterSpacing: adaptiveFontSize(4),
    color: 'white',
  },
});

export default fonts;
