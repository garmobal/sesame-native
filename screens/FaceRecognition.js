import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

import base64ToArrayBuffer from 'base64-arraybuffer'; // for converting base64 images to array buffer
import * as AzureAPI from './../services/azureAPI';
import { checkUserAuth } from './../services/userAPI';

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
    ALLOWED: 4,
    NOT_ALLOWED: 5,
    NOT_RECOGNIZED: 6,
  });

  // GLOBAL STATE
  const selectedDoor = useSelector((state) => state.selectedDoor);

  const [hasPermission, setHasPermission] = useState(null);
  const [faceRecState, setFaceRecState] = useState(eFaceRecState.TAKE_SELFIE);
  const [detectedFaces, setDetectedFaces] = useState([]);
  const [userName, setUserName] = useState('');

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
    const res = await checkUserAuth(selectedDoor.did, faceDetectRes[0].faceId);

    if (res.access === true) {
      setFaceRecState(eFaceRecState.ALLOWED);
      setUserName(res.firstName);
    } else if (res.access === false) {
      setFaceRecState(eFaceRecState.NOT_ALLOWED);
      setUserName(res.firstName);
    } else {
      setFaceRecState(eFaceRecState.NOT_RECOGNIZED);
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
      <View style={styles.container}>
        <Logo />
        {faceRecState === eFaceRecState.TAKE_SELFIE ||
        faceRecState === eFaceRecState.TAKING_PICTURE ? (
          <View style={styles.cameraContainer}>
            <FRCamera
              detectedFaces={detectedFaces}
              _handleFacesDetected={_handleFacesDetected}
              _takePicture={_takePicture}
              cam={cam}
              faceRecState={faceRecState}
              eFaceRecState={eFaceRecState}
            />
            <FaceSquares detectedFaces={detectedFaces} />
          </View>
        ) : null}
        {faceRecState !== eFaceRecState.TAKE_SELFIE &&
        faceRecState !== eFaceRecState.TAKING_PICTURE ? (
          <View style={styles.textContainer}>
            <TextMessage
              faceRecState={faceRecState}
              eFaceRecState={eFaceRecState}
              userName={userName}
            />
          </View>
        ) : null}
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
  },
  cameraContainer: {
    flex: 1,
    width: '90%',
    borderRadius: 15,
    marginTop: 55,
    marginBottom: 70,
    overflow: 'hidden',
  },
  textContainer: {
    ...cStyle.content,
  },
});
