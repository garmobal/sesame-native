import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

import * as cStyle from './../../style';

import FRCamera from './FRCamera';
import FaceSquares from './FaceSquares';

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
      <View style={styles.useCodeBtnContainer}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            },
            styles.useCodeBtn,
          ]}
          onPress={() => {
            setUserRecState(eUserRecState.ENTER_CODE);
          }}
        >
          <Text style={styles.useCodeBtnText}>Use code</Text>
        </Pressable>
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
    marginTop: 30,
    overflow: 'hidden',
  },
  useCodeBtnContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  useCodeBtn: {
    ...cStyle.redButton,
  },
  useCodeBtnText: {
    ...cStyle.redButtonText,
    fontSize: 18,
  },
});
