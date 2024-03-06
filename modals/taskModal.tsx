// TaskModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SDims from '../config/dimensions';
import fonts from '../config/fonts';
import Buttons from '../config/buttons'; // Assuming buttons.tsx exports the Buttons object

interface TaskModalProps {
    isVisible: boolean;
    onClose: () => void;
    segment: string;
    segmentName: string;
    segmentStart: string;
    segmentEnd: string;
    segmentParams: string;
}

const TaskModal: React.FC<TaskModalProps> = ({ isVisible, onClose, segment, segmentName, segmentStart, segmentEnd, segmentParams }) => {
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toTimeString().substring(0, 5); // HH:MM format
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={[fonts.txtList, styles.modalText]}>{segment}</Text>
                    <Text style={[fonts.txtList, styles.modalText]}>{segmentName}</Text>
                    <Text style={[fonts.txtList, styles.modalText]}>{formatTime(segmentStart)}</Text>
                    <Text style={[fonts.txtList, styles.modalText]}>{formatTime(segmentEnd)}</Text>
                    <View style={styles.buttonRow}>
                        <Buttons.ButtonA title="Start/Pause" onPress={() => {}} color='A' />
                        <Buttons.ButtonA title="Stop" onPress={() => {}} color='A' />
                        <Buttons.ButtonA title="Order" onPress={() => {}} color='A' />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'black',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: SDims.screenWidth * 0.8, // 80% of screen width
        height: SDims.screenHeight * 0.5, // 50% of screen height
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%', // You might want to adjust this
    },
});

export default TaskModal;
