// Register.tsx
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Alert } from 'react-native';
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
                placeholderTextColor="#AD8457" // Adjusted color
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                placeholderTextColor="#AD8457" // Adjusted color
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                placeholder="Confirm Password"
                placeholderTextColor="#AD8457" // Adjusted color
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
        backgroundColor: 'black', // Keep or change as necessary
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: SDims.Height10p,
        margin: SDims.D12px,
        borderWidth: SDims.D2px,
        padding: SDims.D10px,
        paddingLeft: SDims.D100px,
        borderColor: '#AD8457', // Adjusted from white to #AD8457
        width: SDims.Width80p, // Adjust width according to your dimensions config
        fontSize: fonts.txtCard.fontSize, // Use font size from txtCard
        fontFamily: fonts.txtCard.fontFamily, // Use font family from txtCard
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