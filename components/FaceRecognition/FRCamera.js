import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

function FRCamera({ detectedFaces, _handleFacesDetected, _takePicture, cam }) {
  // RENDER
  return (
    <Camera
      ref={cam}
      style={styles.camera}
      type={Camera.Constants.Type.front}
      onFacesDetected={_handleFacesDetected}
      faceDetectorSettings={{
        mode: FaceDetector.Constants.Mode.fast,
        detectLandmarks: FaceDetector.Constants.Landmarks.none,
        runClassifications: FaceDetector.Constants.Classifications.none,
        minDetectionInterval: 100,
        tracking: true,
      }}
    >
      <View style={styles.takeButtonContainer}>
        <TouchableOpacity
          onPress={_takePicture}
          style={
            detectedFaces.length === 0
              ? styles.takeButtonDis
              : styles.takeButton
          }
        />
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 1.4,
  },
  takeButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    flex: 1,
    alignItems: 'center',
  },
  takeButton: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  takeButtonDis: {
    opacity: 0,
  },
});

export default FRCamera;
