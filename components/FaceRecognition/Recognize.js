import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

import FRCamera from './FRCamera';
import FaceSquares from './FaceSquares';

function Recognize({
  detectedFaces,
  _handleFacesDetected,
  _takePicture,
  cam,
  faceRecState,
  eFaceRecState,
  setFaceRecState,
}) {
  return (
    <>
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
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          },
          styles.useCodeBtn,
        ]}
        onPress={() => {
          setFaceRecState(eFaceRecState.ENTER_CODE);
        }}
      >
        <Text>Use code instead</Text>
      </Pressable>
    </>
  );
}

export default Recognize;

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 10,
    width: '90%',
    borderRadius: 15,
    marginTop: 30,
    marginBottom: 30,
    overflow: 'hidden',
  },
  useCodeBtn: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 3,
  },
});
