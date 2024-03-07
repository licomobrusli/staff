// schedule.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getTimeResourcesQueue } from '../config/apiCalls';
import fonts from '../config/fonts';
import * as Keychain from 'react-native-keychain';
import Timer from '../config/timer';
import { updateTimeResource } from '../config/apiCalls';

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
    const [elapsedTimes, setElapsedTimes] = useState<{ [key: number]: number }>({});

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

    const firstActiveTaskIndex = timeResources.findIndex(resource => 
        resource.segment_params === 'TASKS' && !resource.dismissed
    );
    
    const startTimer = (index: number) => {
        if (index === firstActiveTaskIndex) {
            const currentTime = new Date().toISOString();
            const updatedResources = [...timeResources];
            updatedResources[index].staff_start = currentTime;
            setTimeResources(updatedResources);
            setActiveTimers({ ...activeTimers, [index]: true });
        }
    };
    
    const stopTimer = async (index: number) => {
        const updatedResources = [...timeResources];
        if (index === firstActiveTaskIndex && updatedResources[index].segment_params === 'TASKS') {
            if (activeTimers[index]) {
                const currentTime = new Date().toISOString();
                updatedResources[index].staff_end = currentTime;
                
                let elapsedTime = elapsedTimes[index] || 0; // Default to 0 if not previously set
                console.log('Elapsed time:', elapsedTime);
                updatedResources[index].staff_timer = elapsedTime;
                console.log('Updated resource:', updatedResources[index]);
                setElapsedTimes({ ...elapsedTimes, [index]: elapsedTime }); // Update elapsed time
                setActiveTimers({ ...activeTimers, [index]: false }); // Stop the timer
            } else {
                if (!updatedResources[index].dismissed) {
                    updatedResources[index].dismissed = true;
                }
            }
    
            if (updatedResources[index].dismissed) {
                const credentials = await Keychain.getGenericPassword();
                if (credentials) {
                    try {
                        await updateTimeResource(
                            credentials.password,
                            updatedResources[index].id,
                            updatedResources[index].staff_start!,
                            updatedResources[index].staff_end!,
                            updatedResources[index].staff_timer!,
                        );
                    } catch (error) {
                        console.error('Failed to update time resource:', error);
                    }
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

    const sortedTimeResources = [...timeResources].sort((a, b) => 
        new Date(a.segment_start).getTime() - new Date(b.segment_start).getTime()
    );

    // Styles definition should be here before using in the return statement
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
            flex: 1,
            textAlign: 'center',
        },
        text: {
            fontSize: 16,
        },
        touchableCell: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        dismissedItem: {
            backgroundColor: 'red',
        },
    });

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
                    <TouchableOpacity style={styles.touchableCell} onPress={() => {/* Segment/order clicked logic here */}}>
                        <Text style={fonts.txtList}>{resource.order_number || resource.segment}</Text>
                    </TouchableOpacity>
                    <Text style={[fonts.txtList, styles.tableCell]}>{resource.segment_name}</Text>
                    <TouchableOpacity 
                        style={styles.touchableCell}
                        onPress={() => {
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
                            <Timer 
                                initialSeconds={elapsedTimes[index] || Math.floor((Date.now() - new Date(resource.staff_start!).getTime()) / 1000)}
                                onUpdate={(newTime) => {
                                    // Defer the state update to after the current execution context
                                    setTimeout(() => {
                                        setElapsedTimes(prevElapsedTimes => ({...prevElapsedTimes, [index]: newTime}));
                                    }, 0);
                                }}
                            />
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

export default ScheduleScreen;