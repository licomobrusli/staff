// timer.tsx
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import fonts from '../config/fonts';

// Define a type for the Timer's props
interface TimerProps {
    initialSeconds: number;
    onUpdate: (newSeconds: number) => void; // This specifies that onUpdate is a function that takes a number and returns void
}

// Timer component definition
const Timer: React.FC<TimerProps> = ({ initialSeconds, onUpdate }) => {
    const [seconds, setSeconds] = useState<number>(initialSeconds);
    const [isActive, setIsActive] = useState<boolean>(true);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null; // Use NodeJS.Timeout type for Node.js timers, or number for browser (depends on your environment)

        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => {
                    const newSeconds = seconds + 1;
                    onUpdate(newSeconds); // Update the parent component's state
                    return newSeconds;
                });
            }, 1000);
        } else if (interval) {
            clearInterval(interval);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isActive, onUpdate]); // Include onUpdate in the dependency array

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    // Function to format time from seconds into MM:SS format
    const formatTime = () => {
        const totalSeconds = seconds;
        const getSeconds = `0${totalSeconds % 60}`.slice(-2);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const getMinutes = `0${totalMinutes}`.slice(-2);

        return `${getMinutes}:${getSeconds}`;
    };

    return (
        <TouchableOpacity onPress={toggleTimer} style={styles.container}>
            <Text style={[fonts.txtList, styles.timerText]}>{formatTime()}</Text>
        </TouchableOpacity>
    );
};

// Styles for the Timer component
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        color: 'black',
        // Here you can apply additional styles if necessary
    }
});

export default Timer;
