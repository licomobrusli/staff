// Register.tsx
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { register } from '../config/apiCalls';

type Props = {
    navigation: StackNavigationProp<any, any>;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationMessage, setValidationMessage] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setValidationMessage('Passwords do not match.');
            return;
        }

        // Basic password requirements: at least 8 characters, one uppercase, one lowercase, one number, and one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setValidationMessage('Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.');
            return;
        }

        // If validation passes, try to register
        try {
            const data = await register(username, password); // Implement this function in your apiCalls.ts
            if (data.success) {
                navigation.navigate('Login'); // Or whichever screen should follow successful registration
            } else {
                setValidationMessage(data.message); // Assuming your API returns a message in case of error
            }
        } catch (error) {
            setValidationMessage('Registration failed. Please try again.');
            console.error('Registration error:', error);
        }
    };


    return (
        <View style={styles.container}>
            {validationMessage.length > 0 && <Text style={styles.validationMessage}>{validationMessage}</Text>}
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="Username"
                placeholderTextColor="#fff"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                placeholderTextColor="#fff"
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                placeholder="Confirm Password"
                placeholderTextColor="#fff"
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
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
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'white',
        color: 'white',
        width: '80%',
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        width: '80%',
        marginTop: 12,
    },
    buttonText: {
        color: 'white',
    },
    validationMessage: {
        color: 'red',
        marginBottom: 10,
    },
});

export default RegisterScreen;
