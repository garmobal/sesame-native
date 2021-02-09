import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { setCurrentImage } from '../store/actions/registrationActions';
import { useDispatch } from 'react-redux';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import * as cStyle from '../style';

function FaceRegistrationCamera({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);

  const dispatch = useDispatch();

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
    return <Text>Camera doesn't have permission</Text>;
  }

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync({
        base64: true,
        quality: 0.25,
      });
      dispatch(setCurrentImage(data));
      navigation.navigate('FaceRegistrationProcess');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.camera}
          type={Camera.Constants.Type.front}
        />
      </View>
      <Pressable
        style={styles.cameraClick}
        title="Take picture"
        onPress={() => takePicture()}
      />
    </View>
  );
}

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
    marginTop: 80,
    marginBottom: 150,
    overflow: 'hidden',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  cameraClick: {
    width: 70,
    height: 70,
    bottom: 40,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: cStyle.colors.highlight,
    position: 'absolute',
  },
});

export default FaceRegistrationCamera;
