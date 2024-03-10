// phaseModal.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { getOrderAssignments } from '../config/apiCalls';

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
                const fetchedAssignments = await getOrderAssignments(orderNumber);
                setAssignments(fetchedAssignments);
            }
        };
        fetchAssignments();
    }, [orderNumber]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={onClose}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <ScrollView>
                    <Text style={{ color: 'black', fontSize: 20, marginBottom: 20 }}>Order Number: {orderNumber}</Text>
                    {assignments.map((assignment, index) => (
                        <View key={index} style={{ marginVertical: 10 }}>
                            <Text>Segment Name: {assignment.segment_name}</Text>
                            <Text>Resource Item Code: {assignment.resource_item_code}</Text>
                            <Text>Start Time: {assignment.staff_start || assignment.segment_start}</Text>
                            <Text>End Time: {assignment.staff_end || assignment.segment_end}</Text>
                        </View>
                    ))}
                </ScrollView>
                <TouchableOpacity onPress={onClose}>
                    <Text style={{ color: 'black', fontSize: 24 }}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default PhaseModal;
