import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import base64ToArrayBuffer from 'base64-arraybuffer'; // for converting base64 images to array buffer
import * as AzureAPI from './../../services/azureAPI';

function FRCamera({
  cam,
  _handleFacesDetected,
  eFaceRecState,
  faceRecState,
  setFaceRecState,
}) {
  // CONSTANTS
  const SHOW_QUOTE_TIME = 5000; // [ms]

  // LOCAL FUNCTIONS
  /**
   * Callback called when a picture is taken.
   */
  const _takePicture = async () => {
    setFaceRecState(eFaceRecState.CHECKING_FACE);

    const option = {
      quality: 0.25,
      base64: true,
    };
    try {
      const picture = await cam.current.takePictureAsync(option);
      _checkPicture(picture);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  /**
   * Check if a picture contains a face calling the Azure API.
   *
   * @param {object} picture, picture taken with the camera.
   */
  const _checkPicture = async (picture) => {
    const octetStream = base64ToArrayBuffer.decode(picture.base64);
    const faceDetectRes = await AzureAPI.detectFace(octetStream);

    // TODO: send the face id and the selected door to the back end
    // Wait for the answer
    // If the user is allowed send the request to open the door
    if (faceDetectRes.length === 0) {
      setFaceRecState(eFaceRecState.FACE_NOT_DETECTED);
    } else {
      setFaceRecState(eFaceRecState.FACE_DETECTED);
    }
    setTimeout(() => {
      setFaceRecState(eFaceRecState.TAKE_SELFIE);
    }, SHOW_QUOTE_TIME);
  };

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
            faceRecState === eFaceRecState.TAKE_SELFIE
              ? styles.takeButton
              : styles.takeButtonDis
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
