import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoginModalFail from '../modals/loginModalFail';
import { login } from '../config/apiCalls';
import fonts from '../config/fonts';
import SDims from '../config/dimensions';
import Buttons from '../config/buttons';
import * as Keychain from 'react-native-keychain';

type Props = {
    navigation: StackNavigationProp<any, any>;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleLogin = async () => {
        try {
            const data = await login(username, password);
            console.log('A. Login Response:', data);

            if (data.status === 'success') {
                // After successful login
                const token = data.token;
                console.log('B. Token:', token);
                await Keychain.setGenericPassword('token', token);
                navigation.navigate('Menu');
            } else {
                setShowModal(true);
            }            
        } catch (error) {
            setShowModal(true);
            console.error('C. Login failed:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="Username"
                placeholderTextColor="#AD8457" // Change color here
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                placeholderTextColor="#AD8457" // Change color here
                secureTextEntry={true}
            />
            <View>
                <Buttons.ButtonA title="Login" onPress={handleLogin} color="A" />
                <Buttons.ButtonA title="Register" onPress={() => navigation.navigate('Register')} color="A" />
                {showModal && <LoginModalFail onClose={() => setShowModal(false)} navigation={navigation} />}
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
        color: '#AD8457',
        borderColor: '#AD8457',
        width: SDims.Width80p,
        fontSize: fonts.txtCard.fontSize,
        fontFamily: fonts.txtCard.fontFamily,
    },
});

export default LoginScreen;
