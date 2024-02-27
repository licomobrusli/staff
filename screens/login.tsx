// login.tsx
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoginModalFail from '../modals/LoginModalFail';

type Props = {
    navigation: StackNavigationProp<any, any>;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleLogin = async () => {
        const response = await fetch('https://yourbackend.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
    
        const data = await response.json();
    
        if (data.success) {
            navigation.navigate('Menu');
        } else {
            setShowModal(true);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.bannerContainer}></View>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="Username"
                placeholderTextColor="#fff"
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                placeholderTextColor="#fff"
                secureTextEntry={true}
            />
            <Button title="Login" onPress={handleLogin} color="white" />
            <Button title="Register" onPress={() => navigation.navigate('Register')} color="white"/>
            {showModal && <LoginModalFail onClose={() => setShowModal(false)} navigation={navigation} />}
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
    bannerContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '33%', // Top third of the screen
        backgroundColor: 'black', // Same as container for now
        borderBottomWidth: 2,
        borderBottomColor: 'white',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'white',
        color: 'white',
        width: '80%', // Set width to 80% of screen width
    },
});

export default LoginScreen;
