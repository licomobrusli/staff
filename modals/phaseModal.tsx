// PhaseModal.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface PhaseModalProps {
    onClose: () => void;
}

const PhaseModal: React.FC<PhaseModalProps> = ({ onClose }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <TouchableOpacity onPress={onClose}>
                <Text style={{ color: 'black', fontSize: 68}}>Close</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PhaseModal;
