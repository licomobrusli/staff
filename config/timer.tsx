// timer.tsx
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const Timer = ({ initialSeconds = 0 }) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval as unknown as NodeJS.Timeout);
        }
    
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isActive, seconds]);

    const toggle = () => {
        setIsActive(!isActive);
    };

    const reset = () => {
        setSeconds(0);
        setIsActive(false);
    };

    // Format time for display
    const formatTime = () => {
        const totalSeconds = seconds;
        const getSeconds = `0${(totalSeconds % 60)}`.slice(-2);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const getMinutes = `0${totalMinutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(totalMinutes / 60)}`.slice(-2);

        return `${getHours}:${getMinutes}:${getSeconds}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.timerText}>{formatTime()}</Text>
            <TouchableOpacity onPress={toggle} style={styles.button}>
                <Text>{isActive ? 'Pause' : 'Start'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={reset} style={styles.button}>
                <Text>Reset</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 30,
    marginBottom: 30,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  }
});

export default Timer;