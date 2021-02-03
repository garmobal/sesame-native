import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import { useSelector } from 'react-redux';
import TextMessage from '../components/FaceRecognition/TextMessage';
import FRCamera from './../components/FaceRecognition/FRCamera';
import FaceSquares from './../components/FaceRecognition/FaceSquares';

function FaceRecognition() {
  // LOCAL STATE
  const [eFaceRecState] = useState({
    TAKE_SELFIE: 1,
    CHECKING_FACE: 2,
    FACE_DETECTED: 3,
    FACE_NOT_DETECTED: 4,
  });
  const [hasPermission, setHasPermission] = useState(null);
  const [faceRecState, setFaceRecState] = useState(eFaceRecState.TAKE_SELFIE);
  const [detectedFaces, setDetectedFaces] = useState([]);

  // GLOBAL STATE
  const selectedDoor = useSelector((state) => state.selectedDoor);

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

  // RENDER
  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={styles.container}>
        <FRCamera
          _handleFacesDetected={_handleFacesDetected}
          eFaceRecState={eFaceRecState}
          faceRecState={faceRecState}
          setFaceRecState={setFaceRecState}
        />
        <FaceSquares detectedFaces={detectedFaces} />
        <TextMessage
          faceRecState={faceRecState}
          selectedDoor={selectedDoor}
          eFaceRecState={eFaceRecState}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FaceRecognition;
