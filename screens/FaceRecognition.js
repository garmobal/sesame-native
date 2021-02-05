import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

import base64ToArrayBuffer from 'base64-arraybuffer'; // for converting base64 images to array buffer
import * as AzureAPI from './../services/azureAPI';

import FRCamera from './../components/FaceRecognition/FRCamera';
import FaceSquares from './../components/FaceRecognition/FaceSquares';
import TextMessage from './../components/FaceRecognition/TextMessage';
import Logo from './../components/Logo';

import * as cStyle from './../style';
import { useSelector } from 'react-redux';

function FaceRecognition() {
  // CONSTANTS
  const SHOW_QUOTE_TIME = 5000; // [ms]

  // LOCAL STATE
  const [eFaceRecState] = useState({
    TAKE_SELFIE: 1,
    TAKING_PICTURE: 2,
    CHECKING_FACE: 3,
    FACE_DETECTED: 4,
    FACE_NOT_DETECTED: 5,
  });

  // GLOBAL STATE
  const selectedDoor = useSelector((state) => state.selectedDoor);

  const [hasPermission, setHasPermission] = useState(null);
  const [faceRecState, setFaceRecState] = useState(eFaceRecState.TAKE_SELFIE);
  const [detectedFaces, setDetectedFaces] = useState([]);

  // CAMERA REF
  const cam = useRef();

  // HOOKS
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // HELPER FUNCTIONS
  /**
   * Callback called when a face is detected, it updates the local state.
   *
   * @param {array} faces, array containing all the faces detected by the camera.
   */
  const _handleFacesDetected = ({ faces }) => {
    setDetectedFaces(faces);
  };

  /**
   * Callback called when a picture is taken.
   */
  const _takePicture = async () => {
    setFaceRecState(eFaceRecState.TAKING_PICTURE);
    const option = {
      quality: 0.25,
      base64: true,
    };
    try {
      const picture = await cam.current.takePictureAsync(option);
      setFaceRecState(eFaceRecState.CHECKING_FACE);
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
    console.log('selectedDoor :>> ', selectedDoor);
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
  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      // <View style={{ ...cStyle.container }}>
      <View style={styles.container}>
        <Logo />
        {/* <View style={{ ...cStyle.content }}> */}
        <View style={styles.cameraContainer}>
          {faceRecState === eFaceRecState.TAKE_SELFIE ||
          faceRecState === eFaceRecState.TAKING_PICTURE ? (
            <FRCamera
              detectedFaces={detectedFaces}
              _handleFacesDetected={_handleFacesDetected}
              _takePicture={_takePicture}
              cam={cam}
              faceRecState={faceRecState}
              eFaceRecState={eFaceRecState}
            />
          ) : null}
          {faceRecState === eFaceRecState.TAKE_SELFIE ||
          faceRecState === eFaceRecState.TAKING_PICTURE ? (
            <FaceSquares detectedFaces={detectedFaces} />
          ) : null}
          {faceRecState !== eFaceRecState.TAKE_SELFIE &&
          faceRecState !== eFaceRecState.TAKING_PICTURE ? (
            <TextMessage
              faceRecState={faceRecState}
              eFaceRecState={eFaceRecState}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

export default FaceRecognition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 40,
  },
  cameraContainer: {
    flex: 1,
    width: '90%',
    // height: '70%',
    // flexDirection: 'row',
    borderRadius: 15,
    marginTop: 55,
    marginBottom: 70,
    overflow: 'hidden',
  },
});
