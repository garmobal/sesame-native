import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Camera } from 'expo-camera';
import { useSelector } from 'react-redux';
import base64ToArrayBuffer from 'base64-arraybuffer'; // for converting base64 images to array buffer
import axios from 'axios'; // for making requests to the cognitive services API

const key = 'dab23811cac547258589f18bd4aaf214';
const loc = 'westeurope.api.cognitive.microsoft.com'; // replace with the server nearest to you

const azureOptions = {
  baseURL: `https://${loc}/face/v1.0`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/octet-stream',
    'Ocp-Apim-Subscription-Key': key,
  },
};

function FaceRecognition() {
  const TAKE_SELFIE = 1;
  const CHECKING_FACE = 2;
  const FACE_DETECTED = 3;
  const FACE_NOT_DETECTED = 4;
  const SHOW_QUOTE_TIME = 5000; // [ms]

  const [hasPermission, setHasPermission] = useState(null);
  const [faceRecState, setFaceRecState] = useState(TAKE_SELFIE);

  const quotes = useSelector((state) => state.quotes);

  const cam = useRef();

  const getRandomQuote = () => {
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
      const faceDetectInstance = axios.create(azureOptions);

      const faceDetectRes = await faceDetectInstance.post(
        '/detect?returnFaceId=true&returnFaceAttributes=smile',
        octetStream,
      );
      // TODO: send the face id and the selected door to the back end
      // Wait for the answer
      // If the user is allowed send the request to open the door
      if (faceDetectRes.data.length === 0) {
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
      testMessage = getRandomQuote();
      break;
    case FACE_NOT_DETECTED:
      testMessage = 'Face not detected';
      break;
    case TAKE_SELFIE:
      testMessage = 'Take a selfie to enter the door';
      break;
    case CHECKING_FACE:
      testMessage = 'We are checking your identity';
      break;
    default:
      testMessage = '';
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cam}
        style={styles.camera}
        type={Camera.Constants.Type.front}
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
});

export default FaceRecognition;
