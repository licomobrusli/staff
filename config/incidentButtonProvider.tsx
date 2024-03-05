// incidentButtonProvider.tsx
import React, { useRef, ReactNode, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, PanResponder, Animated, Alert, Modal, TextInput, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { captureScreen } from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import axios from 'axios';
import SDims from '../config/dimensions';
import fonts from '../config/fonts';

interface FloatingButtonProviderProps {
    children: ReactNode;
}

const FloatingButtonProvider: React.FC<FloatingButtonProviderProps> = ({ children }) => {
    const [comment, setComment] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [screenshotUri, setScreenshotUri] = useState<string | null>(null);

    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false
                }).start();
            }
        })
    ).current;

    const handleReport = () => {
        captureScreen({
            format: 'jpg',
            quality: 0.8
        }).then(
            uri => {
                console.log("Screenshot saved to", uri);
                setScreenshotUri(uri);
                setModalVisible(true);
            },
            error => console.error("Oops, snapshot failed", error)
        );
    };

    const handleSubmit = () => {
        if (screenshotUri) {
            RNFS.readFile(screenshotUri, 'base64').then(base64data => {
                const payload = {
                    image: base64data,
                    comment: comment
                };
                axios.post('YOUR_BACKEND_ENDPOINT', payload) // Replace 'YOUR_BACKEND_ENDPOINT' with your actual endpoint
                    .then(response => {
                        Alert.alert('Report sent successfully');
                        setModalVisible(false);
                        setComment('');
                        setScreenshotUri(null);
                    }).catch(error => {
                        console.error("There was an issue sending the report", error);
                    });
            });
        } else {
            Alert.alert("Error", "No screenshot available to send.");
        }
    };

    const animatedStyle = {
        transform: [
            { translateX: pan.x },
            { translateY: pan.y }
        ]
    };

    return (
        <View style={{ flex: 1 }}>
            {children}
            <Animated.View
                style={[styles.floatingButton, animatedStyle]}
                {...panResponder.panHandlers}
            >
                <TouchableOpacity onPress={handleReport}>
                    <MaterialIcons name="report-problem" size={24} color="white" />
                </TouchableOpacity>
            </Animated.View>
            {modalVisible && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={modalStyles.centeredView}>
                        <View style={modalStyles.modalView}>
                            <Text style={fonts.txtCard}>Enter your comment</Text>
                            <TextInput
                                style={[modalStyles.modalTextInput, fonts.txtCard]}
                                onChangeText={setComment}
                                value={comment}
                                placeholder="Comment here..."
                                placeholderTextColor="#AD8457"
                                multiline
                            />
                            <TouchableOpacity
                                style={modalStyles.buttonClose}
                                onPress={handleSubmit}
                            >
                                <Text style={fonts.txtCard}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        backgroundColor: 'red',
        padding: 20,
        borderRadius: 50,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});

const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'black',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: SDims.Width90p,
        borderColor: '#AD8457',
        borderWidth: 2,
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 15,
    },
    modalTextInput: {
        borderColor: '#AD8457',
        borderWidth: 1,
        padding: 10,
        width: '100%',
        color: '#AD8457',
        marginTop: 15,
    },
});

export default FloatingButtonProvider;
