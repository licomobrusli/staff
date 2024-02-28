import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoginModalFail from '../modals/loginModalFail';
import { login } from '../config/apiCalls';
import fonts from '../config/fonts';
import SDims from '../config/dimensions';
import Buttons from '../config/buttons'; // Adjust the path as necessary

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

            if (data.success) {
                navigation.navigate('Menu');
            } else {
                setShowModal(true);
            }
        } catch (error) {
            setShowModal(true);
            console.error('Login failed:', error);
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
        borderColor: '#AD8457', // Change from white to #AD8457
        width: SDims.Width80p, // Adjust width according to your dimensions config
        fontSize: fonts.txtCard.fontSize, // Use font size from txtCard
        fontFamily: fonts.txtCard.fontFamily, // Use font family from txtCard
    },
});

export default LoginScreen;
