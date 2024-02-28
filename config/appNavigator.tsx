// AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/login';
import MenuScreen from '../screens/menu';
import RegisterScreen from '../screens/register';
import { SafeAreaView } from 'react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen name="Menu" component={MenuScreen} />
                </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
