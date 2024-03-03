import React from 'react';
import { View, Modal, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Buttons from '../config/buttons'; // Make sure the path matches your project structure
import fonts from '../config/fonts'; // Ensure this is the correct path to your fonts configuration

type Props = {
    onClose: () => void;
    navigation: StackNavigationProp<any, any>;
};

const LoginModalFail: React.FC<Props> = ({ onClose, navigation }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Unable to sign in. Please check your credentials and try again.</Text>
                    <Buttons.ButtonA 
                        title="Try Again" 
                        onPress={onClose} 
                        color="A" // Adjust as needed based on your color configuration
                    />
                    <Buttons.ButtonA 
                        title="Sign Up" 
                        onPress={() => {
                            onClose();
                            navigation.navigate('Register');
                        }} 
                        color="A" // Adjust as needed based on your color configuration
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        padding: 35,
        alignItems: 'center',
        // Removed all additional styling for basic modal appearance
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: fonts.txtCard.fontSize, // Use font size from your configuration
        fontFamily: fonts.txtCard.fontFamily, // Use font family from your configuration
    },
});

export default LoginModalFail;
