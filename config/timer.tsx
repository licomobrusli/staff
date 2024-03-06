// timer.tsx
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import fonts from '../config/fonts';

const Timer = ({ initialSeconds = 0 }) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (interval !== null) {
            clearInterval(interval);
        }

        return () => {
            if (interval !== null) {
                clearInterval(interval);
            }
        };
    }, [isActive, seconds]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    // Format time for display
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

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        color: 'black',
        // Additional custom styles for text if necessary, 
        // otherwise just rely on fonts.txtList
    }
});

export default Timer;
