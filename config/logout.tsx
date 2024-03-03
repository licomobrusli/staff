// logout.tsx
import { Alert } from 'react-native';
import { logout } from '../config/apiCalls';
import * as Keychain from 'react-native-keychain';

const performLogout = async (navigation: any) => {
    try {
        const response = await logout();
        console.log('Logout Response:', response);


        if (response.status === 'success') {
            await Keychain.resetGenericPassword();
            navigation.replace('Login');
        } else {
            // If the logout was not successful, inform the user
            Alert.alert('Logout Failed', 'Please try again.');
        }
    } catch (error) {
        console.error('Logout failed:', error);
        Alert.alert('Logout Error', 'An error occurred. Please try again.');
    }
};

export default performLogout;
