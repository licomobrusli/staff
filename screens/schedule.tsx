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
    staff_start: string | null;
    staff_end: string | null;
    staff_timer: number | null;
    dismissed?: boolean;
}

const ScheduleScreen: React.FC = () => {
    const [timeResources, setTimeResources] = useState<TimeResource[]>([]);
    const [activeTimers, setActiveTimers] = useState<{ [key: number]: boolean }>({});

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

    const firstActiveTaskIndex = timeResources.findIndex(resource => 
        resource.segment_params === 'TASKS' && !resource.dismissed
    );

    const startTimer = (index: number) => {
        // Only allow the timer to start if this is the first active 'TASKS' item.
        if (index === firstActiveTaskIndex) {
            const currentTime = new Date().toISOString();
            const updatedResources = [...timeResources];
            updatedResources[index].staff_start = currentTime;
            setTimeResources(updatedResources);
            setActiveTimers({ ...activeTimers, [index]: true });
        }
    };
    
    const stopTimer = (index: number) => {
        const updatedResources = [...timeResources];
        if (index === firstActiveTaskIndex && updatedResources[index].segment_params === 'TASKS') {
            if (activeTimers[index]) { // Timer is active
                const currentTime = new Date().toISOString();
                updatedResources[index].staff_end = currentTime;
                setActiveTimers({ ...activeTimers, [index]: false });
            } else {
                // If staff_end is already set, then dismiss the task on this click.
                // This checks if the task has been previously stopped but not yet dismissed.
                if (updatedResources[index].staff_end) {
                    updatedResources[index].dismissed = true; // Mark as dismissed, stop any timer action.
                }
            }
            setTimeResources(updatedResources);
        }
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        // Adjust for Madrid timezone, considering Madrid is GMT+1 (or GMT+2 during Daylight Saving Time)
        const offset = date.getTimezoneOffset() * 60000; // Convert offset to milliseconds
        const madridTime = new Date(date.getTime() - offset + (3600000 * 1)); // Adjust for GMT+1
        return madridTime.toTimeString().substring(0, 5); // Return time in HH:MM format
    };

    const sortedTimeResources = [...timeResources].sort((a, b) => new Date(a.segment_start).getTime() - new Date(b.segment_start).getTime());

    return (
        <ScrollView style={styles.container}>
            <View style={styles.tableHeader}>
                <Text style={[fonts.txtList, styles.headerCell]}>Segment / Order</Text>
                <Text style={[fonts.txtList, styles.headerCell]}>Name</Text>
                <Text style={[fonts.txtList, styles.headerCell]}>Start</Text>
                <Text style={[fonts.txtList, styles.headerCell]}>End</Text>
                </View>
                {sortedTimeResources.map((resource, index) => (
                    <View key={index} style={[styles.resourceItem, resource.dismissed ? styles.dismissedItem : {}]}>
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
                                // Timer start logic when start area is pressed
                                if (index === firstActiveTaskIndex && resource.segment_params === 'TASKS') {
                                    if (resource.staff_start) {
                                        setActiveTimers({ ...activeTimers, [index]: !activeTimers[index] });
                                    } else {
                                        startTimer(index);
                                    }
                                }
                            }}
                            disabled={index !== firstActiveTaskIndex || resource.segment_params !== 'TASKS'}
                        >
                            {activeTimers[index] ? (
                                <Timer initialSeconds={Math.floor((Date.now() - new Date(resource.staff_start!).getTime()) / 1000)} />
                            ) : (
                                <Text style={fonts.txtList}>
                                    {resource.staff_start ? formatTime(resource.staff_start) : formatTime(resource.segment_start)}
                                </Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.touchableCell} 
                            onPress={() => {
                                // Timer stop logic when stop area is pressed
                                if (index === firstActiveTaskIndex && resource.segment_params === 'TASKS') {
                                    stopTimer(index);
                                }
                            }}
                            disabled={index !== firstActiveTaskIndex || resource.segment_params !== 'TASKS'}
                        >
                            <Text style={fonts.txtList}>
                                {resource.staff_end ? formatTime(resource.staff_end) : formatTime(resource.segment_end)}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
                {sortedTimeResources.length === 0 && (
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
    dismissedItem: {
        backgroundColor: 'red', // Change color to indicate dismissal.
    },
});

export default ScheduleScreen;
