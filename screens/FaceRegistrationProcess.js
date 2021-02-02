import React from 'react';
import { View, StyleSheet, Pressable, Text, Image } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { addImage } from '../store/actions/registrationActions';

function FaceRegistrationProcess({ navigation }) {
  const user = useSelector((state) => state.user);
  const currentImage = useSelector((state) => state.imageRegistration);
  // const dispatch = useDispatch();

  console.log(currentImage, 'image');

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>{user.images.length + 1}</Text>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('FaceRegistrationCamera')}
      >
        <Text style={styles.text}>Take picture</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => console.log(currentImage, 'hello')}
      >
        <Text style={styles.text}>log</Text>
      </Pressable>
      <Image source={{ uri: currentImage }} style={styles.image} />
      <View style={styles.imageContainer}>
        {currentImage ? (
          <Image source={{ uri: currentImage }} style={styles.image} />
        ) : (
          <Text style={styles.text}>No image to display</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 2,
    flexDirection: 'column',
    borderWidth: 3,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 3,
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  text: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#ddd',
    borderRadius: 5,
    width: '100%',
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});

export default FaceRegistrationProcess;
