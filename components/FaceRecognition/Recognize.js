import React from 'react';
import { View, StyleSheet } from 'react-native';

import FRCamera from './FRCamera';
import FaceSquares from './FaceSquares';
import RedButton from './../UI/RedButton';

function Recognize({
  detectedFaces,
  _handleFacesDetected,
  _takePicture,
  cam,
  userRecState,
  eUserRecState,
  setUserRecState,
}) {
  return (
    <>
      <View style={styles.useCodeBtnContainer}>
        <RedButton
          size={200}
          clicked={() => {
            setUserRecState(eUserRecState.ENTER_CODE);
          }}
          text={'Use code'}
          marginBottom={0}
        />
      </View>
      <View style={styles.cameraContainer}>
        <FRCamera
          detectedFaces={detectedFaces}
          _handleFacesDetected={_handleFacesDetected}
          _takePicture={_takePicture}
          cam={cam}
          userRecState={userRecState}
          eUserRecState={eUserRecState}
        />
        <FaceSquares detectedFaces={detectedFaces} />
      </View>
    </>
  );
}

export default Recognize;

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 3,
    width: '90%',
    borderRadius: 15,
    marginTop: 60,
    overflow: 'hidden',
    marginBottom: 20,
  },
  useCodeBtnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
