import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { useSelector } from 'react-redux';
import base64ToArrayBuffer from 'base64-arraybuffer'; // for converting base64 images to array buffer
import detectFace from './../services/azureAPI';

function FaceRecognition() {
  const TAKE_SELFIE = 1;
  const CHECKING_FACE = 2;
  const FACE_DETECTED = 3;
  const FACE_NOT_DETECTED = 4;
  const SHOW_QUOTE_TIME = 5000; // [ms]

  const [hasPermission, setHasPermission] = useState(null);
  const [faceRecState, setFaceRecState] = useState(TAKE_SELFIE);
  const [detectedFaces, setDetectedFaces] = useState([]);

  const quotes = useSelector((state) => state.quotes);
  const selectedDoor = useSelector((state) => state.selectedDoor);

  const cam = useRef();

  const _getRandomQuote = () => {
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  };

  const _takePicture = async () => {
    setFaceRecState(CHECKING_FACE);

    const option = {
      quality: 0.25,
      base64: true,
    };
    try {
      const picture = await cam.current.takePictureAsync(option);
      const octetStream = base64ToArrayBuffer.decode(picture.base64);
      const faceDetectRes = await detectFace(octetStream);

      // TODO: send the face id and the selected door to the back end
      // Wait for the answer
      // If the user is allowed send the request to open the door
      if (faceDetectRes.length === 0) {
        setFaceRecState(FACE_NOT_DETECTED);
      } else {
        setFaceRecState(FACE_DETECTED);
      }
      setTimeout(() => {
        setFaceRecState(TAKE_SELFIE);
      }, SHOW_QUOTE_TIME);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  let testMessage;
  switch (faceRecState) {
    case FACE_DETECTED:
      testMessage = _getRandomQuote();
      break;
    case FACE_NOT_DETECTED:
      testMessage = 'Face not detected';
      break;
    case TAKE_SELFIE:
      testMessage = `Take a selfie to enter ${selectedDoor.name}`;
      break;
    case CHECKING_FACE:
      testMessage = 'We are checking your identity';
      break;
    default:
      testMessage = '';
  }

  const _handleFacesDetected = ({ faces }) => {
    setDetectedFaces(faces);
  };

  const renderFace = ({ bounds, faceID, rollAngle, yawAngle }) => {
    return (
      <View
        key={faceID}
        transform={[
          { perspective: 600 },
          { rotateZ: `${rollAngle.toFixed(0)}deg` },
          { rotateY: `${yawAngle.toFixed(0)}deg` },
        ]}
        style={[
          styles.face,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      />
    );
  };

  const renderFaces = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {detectedFaces.map(renderFace)}
    </View>
  );

  return (
    <View style={styles.container}>
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
              faceRecState === TAKE_SELFIE
                ? styles.takeButton
                : styles.takeButtonDis
            }
          />
        </View>
      </Camera>
      {renderFaces()}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{testMessage}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  face: {
    padding: 10,
    borderWidth: 5,
    borderRadius: 2,
    position: 'absolute',
    borderColor: 'orange',
    justifyContent: 'center',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
});

export default FaceRecognition;
