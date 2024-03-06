// schedule.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getTimeResourcesQueue } from '../config/apiCalls';
import fonts from '../config/fonts';
import * as Keychain from 'react-native-keychain';
import Timer from '../config/timer';

interface TimeResource {
    id: number;
    segment: string;
    segment_name: string;
    segment_start: string;
    segment_end: string;
    segment_params: string;
    order_number: string | null;
}

const ScheduleScreen: React.FC = () => {
    const [timeResources, setTimeResources] = useState<TimeResource[]>([]);

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

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toTimeString().substring(0, 5); // HH:MM format
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.tableHeader}>
                <Text style={[fonts.txtList, styles.headerCell]}>Segment / Order</Text>
                <Text style={[fonts.txtList, styles.headerCell]}>Name</Text>
                <Text style={[fonts.txtList, styles.headerCell]}>Start</Text>
                <Text style={[fonts.txtList, styles.headerCell]}>End</Text>
                </View>
                {timeResources.length > 0 ? timeResources.map((resource, index) => (
                    <View key={index} style={styles.resourceItem}>
                        <TouchableOpacity 
                            style={styles.touchableCell} 
                            onPress={() => {
                                // Implement what happens when segment/order is clicked
                                console.log('Segment/Order clicked', resource.segment, resource.order_number);
                            }}
                        >
                            <Text style={fonts.txtList}>
                                {resource.order_number || resource.segment}
                            </Text>
                        </TouchableOpacity>
                        <Text style={[fonts.txtList, styles.tableCell]}>{resource.segment_name}</Text>
                        <TouchableOpacity 
                            style={styles.touchableCell} 
                            onPress={() => {
                                // Implement what happens when start time is clicked
                                console.log('Start time clicked', resource.segment_start);
                            }}
                        >
                            <Text style={fonts.txtList}>{formatTime(resource.segment_start)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.touchableCell} 
                            onPress={() => {
                                // Implement what happens when end time is clicked
                                console.log('End time clicked', resource.segment_end);
                            }}
                        >
                            <Text style={fonts.txtList}>{formatTime(resource.segment_end)}</Text>
                        </TouchableOpacity>
                    </View>
                )) : (
                    <Text style={fonts.txtList}>No time resources available</Text>
                )}

        </ScrollView>
    );
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
        flex: 1, // Allocate equal space for each header
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'black',
    },
    resourceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#AD8457',
    },
    tableCell: {
        flex: 1, // Allocate equal space for each column in the row
        textAlign: 'center', // Center-align texts within cells
    },
    text: {
        fontSize: 16,
    },
    touchableCell: {
        flex: 1, // Maintain layout from your previous styles
        justifyContent: 'center', // Center content vertically if needed
        alignItems: 'center', // Center content horizontally if needed
        // Add other ViewStyle properties as needed
    },
});

export default ScheduleScreen;
