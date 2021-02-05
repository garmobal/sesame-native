import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, Pressable, Text, Image, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import smile from '../assets/registration/1.png';
import sad from '../assets/registration/2.png';
import silly from '../assets/registration/3.png';
import {
  addImage,
  clearCurrentImage,
  registerCurrentUser,
} from '../store/actions/registrationActions';
import * as cStyle from '../style';

function FaceRegistrationProcess({ navigation }) {
  const user = useSelector((state) => state.user);
  const currentImage = useSelector((state) => state.imageRegistration);
  const registrationStatus = useSelector((state) => state.registrationStatus);
  const emojis = [smile, sad, silly];
  const dispatch = useDispatch();

  const regStatus = useCallback(() => registrationStatus.status, [
    registrationStatus.status,
  ]);

  useEffect(() => {
    const unsbuscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      if (regStatus() !== 'success') {
        Alert.alert(
          'Exit registration?',
          'If you leave, your images will not be saved. \n\nAre you sure you want to leave?',
          [
            {
              text: 'Continue registration',
              style: 'cancel',
              onPress: () => {},
            },
            {
              text: 'Exit',
              style: 'destructive',
              onPress: () => navigation.dispatch(e.data.action),
            },
          ],
        );
      } else {
        navigation.dispatch(e.data.action);
      }
    });
    return unsbuscribe;
  }, [navigation, regStatus]);

  const saveImageHandler = () => {
    // Show Spinner
    if (user.images.length === 0) {
      // Register current user when we have a backend
      dispatch(registerCurrentUser(user, currentImage));

      if (registrationStatus.status === 'success') {
        // navigation.removeListener();
        // navigation.navigate('FaceRegistrationSuccess');
      }
    } else {
      // Save image in array -> update counter
      dispatch(addImage(currentImage));
      dispatch(clearCurrentImage());
    }
    // Set current image to null
  };

  let options;
  if (!currentImage) {
    options = (
      <View style={styles.optionsContainer}>
        <Pressable
          style={styles.buttonTakePicture}
          onPress={() => navigation.navigate('FaceRegistrationCamera')}
        >
          <Text style={styles.buttonText}>Take picture</Text>
        </Pressable>
      </View>
    );
  } else {
    options = (
      <View style={styles.optionsContainer}>
        <Pressable
          style={styles.buttonTakePicture}
          onPress={() => navigation.navigate('FaceRegistrationCamera')}
        >
          <Text style={styles.buttonText}>Try again!</Text>
        </Pressable>
        <Pressable style={styles.buttonTakePicture} onPress={saveImageHandler}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Step {user.images.length + 1}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={emojis[user.images.length]} style={styles.image} />
        {currentImage ? (
          <Image source={{ uri: currentImage.uri }} style={styles.image} />
        ) : null}
      </View>
      {options}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'green',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 3,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    color: cStyle.colors.highlight,
    fontSize: 40,
    fontFamily: cStyle.fonts.medium,
    backgroundColor: cStyle.colors.lightest,
    // borderRadius: 100,
    // borderWidth: 3,
    // borderColor: cStyle.colors.highlight,
    padding: 20,
    paddingHorizontal: 40,
    width: '100%',
    textAlign: 'center',
  },
  imageContainer: {
    // flex: 1,
    width: '100%',
    borderWidth: 3,
    borderColor: 'red',
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    width: 170,
    height: 170,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  optionsContainer: {
    flex: 1,
    width: '100%',
    borderWidth: 3,
    borderColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTakePicture: {
    ...cStyle.redButton,
    width: '50%',
  },
  buttonText: {
    ...cStyle.redButtonText,
    fontSize: 20,
  },
});

export default FaceRegistrationProcess;
