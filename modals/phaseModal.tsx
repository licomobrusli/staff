// phaseModal.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { getOrderAssignments } from '../config/apiCalls';
import * as Keychain from 'react-native-keychain';
import fonts from '../config/fonts';

interface PhaseModalProps {
    onClose: () => void;
    orderNumber: string | null;
}

interface Assignment {
    segment_name: string;
    resource_item_code: string;
    staff_start: string | null;
    staff_end: string | null;
    segment_start: string;
    segment_end: string;
}

const PhaseModal: React.FC<PhaseModalProps> = ({ onClose, orderNumber }) => {
    const [assignments, setAssignments] = useState<Assignment[]>([]);

    useEffect(() => {
        const fetchAssignments = async () => {
            if (orderNumber) {
                try {
                    const credentials = await Keychain.getGenericPassword();
                    if (credentials) {
                        const fetchedAssignments = await getOrderAssignments(credentials.password, orderNumber);
                        setAssignments(fetchedAssignments);
                    } else {
                        console.error('No credentials stored');
                    }
                } catch (error) {
                    console.error('Error fetching assignments:', error);
                }
            }
        };
        fetchAssignments();
    }, [orderNumber]);

    const formatDate = (dateString: string | null) => {
        if (dateString) {
            const date = new Date(dateString);
            const roundedMinutes = Math.round(date.getMinutes() + date.getSeconds() / 60);
            const hours = date.getHours();
            const minutes = roundedMinutes < 10 ? '0' + roundedMinutes : roundedMinutes;
            const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
            const year = date.getFullYear();
            return `${day}/${month}/${year} ${hours}:${minutes}`;
        }
        return '---';
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 10,
            backgroundColor: 'black',
        },
        tableHeader: {
            flexDirection: 'row',
            marginBottom: 10,
            paddingHorizontal: 10,
        },
        headerCell: {
            flex: 1,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        assignmentItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            padding: 10,
            backgroundColor: '#AD8457', // Gold color for assignments without staff_end
        },
        tableCell: {
            flex: 1,
            textAlign: 'center',
        },
        dismissedItem: {
            backgroundColor: 'red',
        },
        closeButton: {
            fontSize: 44,
            color: 'black',
        },
    });

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.tableHeader}>
                        <Text style={[fonts.txtList, styles.headerCell]}>Segment</Text>
                        <Text style={[fonts.txtList, styles.headerCell]}>Resource</Text>
                        <Text style={[fonts.txtList, styles.headerCell]}>Start</Text>
                        <Text style={[fonts.txtList, styles.headerCell]}>End</Text>
                    </View>
                    {assignments.map((assignment, index) => (
                        <View key={index} style={[styles.assignmentItem, assignment.staff_end ? styles.dismissedItem : {}]}>
                            <Text style={[fonts.txtList, styles.tableCell]}>{assignment.segment_name}</Text>
                            <Text style={[fonts.txtList, styles.tableCell]}>{assignment.resource_item_code}</Text>
                            <Text style={[fonts.txtList, styles.tableCell]}>{formatDate(assignment.staff_start || assignment.segment_start)}</Text>
                            <Text style={[fonts.txtList, styles.tableCell]}>{formatDate(assignment.staff_end || assignment.segment_end)}</Text>
                        </View>
                    ))}
                </ScrollView>
                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default PhaseModal;
