// AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/login';
import MenuScreen from '../screens/menu';
import RegisterScreen from '../screens/register';
import ScheduleScreen from '../screens/schedule';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Login"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Menu" component={MenuScreen} />
                <Stack.Screen 
                    name="Schedule" 
                    component={ScheduleScreen} 
                    options={{ headerShown: true }} // Enable the header only for this screen
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
