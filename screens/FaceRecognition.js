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

  // RENDER
  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={styles.container}>
        <FRCamera
          eFaceRecState={eFaceRecState}
          setFaceRecState={setFaceRecState}
          detectedFaces={detectedFaces}
          setDetectedFaces={setDetectedFaces}
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
