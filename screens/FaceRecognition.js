import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

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
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [faceDetected, setFaceDetected] = useState(null);

  const cam = useRef();

  const _takePicture = async () => {
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
        setFaceDetected(false);
      } else {
        setFaceDetected(true);
      }
      setTimeout(() => {
        setFaceDetected(null);
      }, 3000);
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
  switch (faceDetected) {
    case true:
      testMessage = 'Face detected';
      break;
    case false:
      testMessage = 'Face not detected';
      break;
    default:
      testMessage = '';
  }

  return (
    <View style={styles.container}>
      <Camera ref={cam} style={styles.camera} type={type}>
        <View style={styles.buttons}>
          <View style={styles.takeButtonContainer}>
            <TouchableOpacity
              onPress={_takePicture}
              style={styles.takeButton}
            />
          </View>
        </View>
        <View>
          <Text style={styles.text}>{testMessage}</Text>
        </View>
        <View style={styles.flipButtonContainer}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              );
            }}
          >
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttons: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'space-between',
  },
  flipButtonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  flipButton: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  takeButtonContainer: {
    alignSelf: 'center',
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
  text: {
    fontSize: 18,
    color: 'white',
  },
});

export default FaceRecognition;
