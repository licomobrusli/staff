// schedule.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getTimeResourcesQueue } from '../config/apiCalls';
import * as Keychain from 'react-native-keychain';

interface TimeResource {
    resource_item_code: string;
    resource_item_name: string;
    segment: string;
    segment_name: string;
    segment_start: string;
    segment_end: string;
    date_created: string;
    resource_model: string;
    resource_model_name: string;
    segment_params: string;
    order_number: string | null;  // Assuming order_number can be null
}


const ScheduleScreen: React.FC = () => {
    const [timeResources, setTimeResources] = useState<TimeResource[]>([]);  // This should be inside the component.

    useEffect(() => {
        const fetchTimeResources = async () => {
            try {
                const credentials = await Keychain.getGenericPassword();
                if (credentials) {
                    const data = await getTimeResourcesQueue(credentials.password);
                    setTimeResources(data);
                    console.log("Fetched time resources:", data);
                } else {
                    console.error('No credentials stored');
                }
            } catch (error) {
                console.error('Failed to fetch time resources:', error);
            }
        };

        fetchTimeResources();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {timeResources.length > 0 ? (
                timeResources.map((resource, index) => (
                    <View key={index} style={styles.resourceItem}>
                        <Text style={styles.text}>Resource Item Code: {resource.resource_item_code}</Text>
                        <Text style={styles.text}>Resource Item Name: {resource.resource_item_name}</Text>
                        <Text style={styles.text}>Segment: {resource.segment} - {resource.segment_name}</Text>
                        <Text style={styles.text}>Segment Start: {new Date(resource.segment_start).toLocaleString()}</Text>
                        <Text style={styles.text}>Segment End: {new Date(resource.segment_end).toLocaleString()}</Text>
                        <Text style={styles.text}>Date Created: {new Date(resource.date_created).toLocaleDateString()}</Text>
                        <Text style={styles.text}>Resource Model: {resource.resource_model} - {resource.resource_model_name}</Text>
                        <Text style={styles.text}>Segment Params: {resource.segment_params}</Text>
                        <Text style={styles.text}>Order Number: {resource.order_number || 'N/A'}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.text}>No time resources available</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    resourceItem: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'lightgrey',
    },
    text: {
        fontSize: 16,
    },
});

export default ScheduleScreen;
