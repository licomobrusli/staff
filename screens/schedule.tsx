// schedule.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getTimeResourcesQueue } from '../config/apiCalls';
import fonts from '../config/fonts';
import * as Keychain from 'react-native-keychain';
import TaskModal from '../modals/taskModal';

interface TimeResource {
    segment: string;
    segment_name: string;
    segment_start: string;
    segment_end: string;
    segment_params: string;
}

const ScheduleScreen: React.FC = () => {
    const [timeResources, setTimeResources] = useState<TimeResource[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedResource, setSelectedResource] = useState<TimeResource | null>(null);

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

    const handleRowPress = (resource: TimeResource) => {
        if (resource.segment_params === 'TASKS') {
            setSelectedResource(resource);
            setIsModalVisible(true);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.tableHeader}>
                <Text style={[fonts.txtList, styles.headerCell]}>Segment</Text>
                <Text style={[fonts.txtList, styles.headerCell]}>Name</Text>
                <Text style={[fonts.txtList, styles.headerCell]}>Start</Text>
                <Text style={[fonts.txtList, styles.headerCell]}>End</Text>
            </View>
            {timeResources.length > 0 ? (
                timeResources.map((resource, index) => (
                    <TouchableOpacity key={index} style={styles.resourceItem} onPress={() => handleRowPress(resource)}>
                        <Text style={[fonts.txtList, styles.tableCell]}>{resource.segment}</Text>
                        <Text style={[fonts.txtList, styles.tableCell]}>{resource.segment_name}</Text>
                        <Text style={[fonts.txtList, styles.tableCell]}>{formatTime(resource.segment_start)}</Text>
                        <Text style={[fonts.txtList, styles.tableCell]}>{formatTime(resource.segment_end)}</Text>
                    </TouchableOpacity>
                ))
            ) : (
                <Text style={fonts.txtList}>No time resources available</Text>
            )}
            {selectedResource && (
                <TaskModal
                    isVisible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    segment={selectedResource.segment}
                    segmentName={selectedResource.segment_name}
                    segmentStart={selectedResource.segment_start}
                    segmentEnd={selectedResource.segment_end}
                    segmentParams={selectedResource.segment_params}
                />
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
});

export default ScheduleScreen;
