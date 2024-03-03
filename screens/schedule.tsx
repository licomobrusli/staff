// schedule.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getTimeResourcesQueue } from '../config/apiCalls';
import * as Keychain from 'react-native-keychain';

interface TimeResource {
    resource_item_code: string;  // Assure this matches the structure you receive from your API.
    segment: string;
    segment_start: string;
    segment_end: string;
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
            {timeResources.map((resource, index) => (
                <View key={index} style={styles.resourceItem}>
                    <Text style={styles.text}>{resource.resource_item_code}</Text>
                </View>
            ))}
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
