import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, NativeModules } from "react-native";
import { Camera, useCameraDevice, useCameraPermission } from "react-native-vision-camera";
import { launchImageLibrary } from "react-native-image-picker";
import axios from "axios";

const { ImageBase64 } = NativeModules; // Import the Native Module

const API_URL = "http://13.48.249.104:8080/process_pose";

const CameraScreen = () => {
    const [recording, setRecording] = useState(false);
    const [apiResponse, setApiResponse] = useState(null); 
    const cameraRef = useRef(null);
    const device = useCameraDevice("back");
    const { hasPermission, requestPermission } = useCameraPermission();
    const frameInterval = useRef(null);

    useEffect(() => {
        (async () => {
            const permission = await requestPermission();
            if (!permission) {
                Alert.alert("Camera permission is required!");
            }
        })();
    }, []);

    // Pick an image from the gallery
    const pickImageFromGallery = async () => {
        try {
            const result = await launchImageLibrary({ mediaType: "photo" });

            if (result.didCancel) return; 

            if (result.assets && result.assets.length > 0) {
                const imagePath = result.assets[0].uri.replace("file://", "");

                console.log("Selected Image Path:", imagePath);

                // Convert image to Base64 using native module
                const base64Image = await ImageBase64.encodeImageToBase64(imagePath);

                // Send frame to API
                await sendFrameToAPI(base64Image);
            }
        } catch (error) {
            console.error("Error picking image:", error);
        }
    };

    // Send frame to API
    const sendFrameToAPI = async (base64Image) => {
        try {
            console.log("Sending frame to API...");
            const response = await axios.post(API_URL, { image: `${base64Image}` });

            console.log("Frame sent to API successfully:", response.data);
            setApiResponse(response.data);
        } catch (error) {
            setApiResponse(" Posture Couldnot be identified");
            console.log("API Error:", error);
        }
    };

    // Capture a frame manually
    const captureFrame = async () => {
        if (!cameraRef.current) return;

        try {
            console.log("Capturing Frame...");

            const photo = await cameraRef.current.takePhoto({
                quality: 0.5,
            });

            if (!photo?.path) {
                console.error("Photo capture failed.");
                return;
            }

            // Use the native Java module to convert the image to Base64
            const base64Image = await ImageBase64.encodeImageToBase64(photo.path);

            // Send frame to API
            await sendFrameToAPI(base64Image);
        } catch (error) {
            console.error("Error capturing frame:", error);
        }
    };

    // Start recording
    const startRecording = async () => {
        if (!cameraRef.current) return;
        setRecording(true);

        try {
            await cameraRef.current.startRecording({
                fileType: "mp4",
                flash: "off",
                enableAudio: false,
                onRecordingFinished: (video) => {
                    console.log("Recording finished:", video);
                    setRecording(false);
                    clearInterval(frameInterval.current);
                },
                onRecordingError: (error) => {
                    console.error("Recording error:", error);
                    setRecording(false);
                    clearInterval(frameInterval.current);
                },
            });

            // Capture frames every 2 seconds while recording
            frameInterval.current = setInterval(() => {
                console.log("Capturing frame during recording...");
                captureFrame();
            }, 6000);
        } catch (error) {
            console.error("Error starting recording:", error);
            setRecording(false);
        }
    };

    // Stop recording
    const stopRecording = async () => {
        if (cameraRef.current) {
            await cameraRef.current.stopRecording();
            setRecording(false);
            clearInterval(frameInterval.current);
        }
    };

    if (!hasPermission) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>Camera permission is required</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {device && (
                <Camera
                    ref={cameraRef}
                    style={styles.camera}
                    device={device}
                    isActive={true}
                    video={true}
                    audio={false}
                    photo={true}
                />
            )}

            <TouchableOpacity style={styles.button} onPress={recording ? stopRecording : startRecording}>
                <Text style={styles.buttonText}>
                    {recording ? "Stop Recording" : "Start Recording"}
                </Text>
            </TouchableOpacity>


            {apiResponse && (
                <View style={styles.responseContainer}>
                    <Text style={styles.responseText}>{JSON.stringify(apiResponse.feedback, null, 2)}</Text>
                </View>
            )}
        </View>
    );
};

export default CameraScreen;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    permissionContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    permissionText: { fontSize: 18, color: "red" },
    camera: { width: "100%", height: "80%",flex:1 },
    button: {
        backgroundColor: "blue",
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    galleryButton: {
        backgroundColor: "green",
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: { color: "#fff", fontSize: 18 },
    responseContainer: {
        position: "absolute", // This positions the box at the center of the screen
        top: "50%", // Centers vertically
        left: "50%", // Centers horizontally
        transform: [{ translateX: -150 }, { translateY: -100 }], // Offset to fine-tune the position
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        padding: 15,
        width: "80%",
        opacity: 0.7, // Makes the box semi-transparent
        alignItems: "center",
        justifyContent: "center",
    },
    responseText: {
        color: "black",
        fontSize: 16,
        fontWeight:"bold",
        textAlign: "center",
    },
});
