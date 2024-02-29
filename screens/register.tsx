import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { register } from '../config/apiCalls';
import Buttons from '../config/buttons';
import fonts from '../config/fonts';
import SDims from '../config/dimensions';

type Props = {
    navigation: StackNavigationProp<any, any>;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationMessage, setValidationMessage] = useState('');

    const handleRegister = async () => {
        setValidationMessage(''); // Clear previous error messages before new validation

        if (password !== confirmPassword) {
            setValidationMessage('Passwords do not match.');
            return;
        }

        if (!passwordRegex.test(password)) {
            setValidationMessage('Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.');
            return;
        }

        try {
            const data = await register(username, password);
            if (data.success) {
                navigation.navigate('Login');
            } else {
                setValidationMessage(data.message || 'Unknown error occurred.'); // Ensure message is always defined
            }
        } catch (error) {
            console.error('Registration error:', error);
            if (error instanceof Error) {
                // Now TypeScript knows 'error' is an instance of Error and has a 'message' property
                setValidationMessage(error.message || 'Registration failed. Please try again.');
            } else {
                // If it's not an Error instance, you can handle it differently or set a default message
                setValidationMessage('Registration failed. Please try again.');
            }
        }
        
    };

    // Basic password requirements: at least 8 characters, one uppercase, one lowercase, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return (
        <View style={styles.container}>
            {validationMessage && validationMessage.length > 0 && (
                <Text style={[fonts.txtCard, styles.validationMessage]}>{validationMessage}</Text>
            )}
            <TextInput
                style={[styles.input, fonts.txtCard]}
                onChangeText={setUsername}
                value={username}
                placeholder="Username"
                placeholderTextColor="#AD8457"
            />
            <TextInput
                style={[styles.input, fonts.txtCard]}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                placeholderTextColor="#AD8457"
                secureTextEntry={true}
            />
            <TextInput
                style={[styles.input, fonts.txtCard]}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                placeholder="Confirm Password"
                placeholderTextColor="#AD8457"
                secureTextEntry={true}
            />
            <View style={styles.buttonContainer}>
                <Buttons.ButtonA title="Register" onPress={handleRegister} color="A" />
                <Buttons.ButtonA title="Back to Login" onPress={() => navigation.goBack()} color="A" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: SDims.Height10p,
        margin: SDims.D12px,
        borderWidth: SDims.D2px,
        padding: SDims.D10px,
        paddingLeft: SDims.D100px,
        borderColor: '#AD8457',
        width: SDims.Width80p,
        color: '#AD8457',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: SDims.D20px,
    },
    validationMessage: {
        color: 'red',
        marginBottom: SDims.D10px,
    },
});

export default RegisterScreen;
