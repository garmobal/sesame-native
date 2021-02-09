import React, { useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import { CommonActions, StackActions } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import smile from '../assets/registration/1.png';
import sad from '../assets/registration/2.png';
import silly from '../assets/registration/3.png';
import {
  addImage,
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
    const handleBackButton = (e) => {
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
            onPress: () => {
              navigation.dispatch(StackActions.pop(3));
            },
          },
        ],
      );
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [navigation, regStatus, dispatch]);

  const saveImageHandler = () => {
    if (user.images.length === 2) {
      dispatch(registerCurrentUser(user, currentImage));
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'Home' }, { name: 'FaceRegistrationSuccess' }],
        }),
      );
    } else {
      dispatch(addImage(currentImage));
    }
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
          style={styles.buttonTakePictureSecondDismiss}
          onPress={() => navigation.navigate('FaceRegistrationCamera')}
        >
          <Text style={styles.buttonTextDismiss}>Try again!</Text>
        </Pressable>
        <Pressable
          style={styles.buttonTakePictureSecond}
          onPress={saveImageHandler}
        >
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
        <Image source={emojis[user.images.length]} style={styles.emoji} />
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
    backgroundColor: cStyle.colors.background,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  title: {
    color: cStyle.colors.highlight,
    fontSize: 40,
    fontFamily: cStyle.fonts.black,
    backgroundColor: cStyle.colors.lightest,
    padding: 20,
    paddingHorizontal: 40,
    width: '100%',
    textAlign: 'center',
  },
  imageContainer: {
    flex: 3.5,
    ...cStyle.whiteCard,
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingVertical: 20,
  },
  emoji: {
    flex: 1,
    width: 160,
    height: 160,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  image: {
    flex: 1,
    width: 160,
    height: 160,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  optionsContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTakePicture: {
    ...cStyle.redButton,
    width: '70%',
  },
  buttonTakePictureSecond: {
    ...cStyle.redButton,
    width: '40%',
    margin: 10,
    borderWidth: 2,
    borderColor: cStyle.colors.highlight,
  },
  buttonTakePictureSecondDismiss: {
    fontSize: 30,
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: cStyle.colors.highlight,
    backgroundColor: cStyle.colors.lightest,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
  },
  buttonText: {
    ...cStyle.redButtonText,
    fontSize: 15,
    fontFamily: cStyle.fonts.medium,
  },
  buttonTextDismiss: {
    ...cStyle.redButtonText,
    fontSize: 20,
    color: cStyle.colors.highlight,
  },
});

export default FaceRegistrationProcess;
