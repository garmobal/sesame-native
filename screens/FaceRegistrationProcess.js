import React, { useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Image,
  Alert,
  CommonActions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import smile from '../assets/registration/1.png';
import sad from '../assets/registration/2.png';
import silly from '../assets/registration/3.png';
import {
  addImage,
  clearCurrentImage,
  registerCurrentUser,
  clearCurrentUserImages,
} from '../store/actions/registrationActions';
import * as cStyle from '../style';

function FaceRegistrationProcess({ navigation }) {
  const user = useSelector((state) => state.user);
  const currentImage = useSelector((state) => state.imageRegistration);
  // const registrationStatus = useSelector((state) => state.registrationStatus);
  const emojis = [smile, sad, silly];
  const dispatch = useDispatch();

  // const regStatus = useCallback(() => registrationStatus.status, [
  //   registrationStatus.status,
  // ]);

  // useEffect(() => {
  //   const unsbuscribe = navigation.addListener('beforeRemove', (e) => {
  //     e.preventDefault();
  //     if (regStatus() !== 'success') {
  //       Alert.alert(
  //         'Exit registration?',
  //         'If you leave, your images will not be saved. \n\nAre you sure you want to leave?',
  //         [
  //           {
  //             text: 'Continue registration',
  //             style: 'cancel',
  //             onPress: () => {},
  //           },
  //           {
  //             text: 'Exit',
  //             style: 'destructive',
  //             onPress: () => {
  //               dispatch(clearCurrentImage());
  //               dispatch(clearCurrentUserImages());
  //               navigation.dispatch(e.data.action);
  //             },
  //           },
  //         ],
  //       );
  //     } else {
  //       navigation.dispatch(e.data.action);
  //     }
  //   });
  //   return unsbuscribe;
  // }, [navigation, regStatus, dispatch]);

  const saveImageHandler = () => {
    // Show Spinner
    if (user.images.length === 1) {
      // Register current user when we have a backend
      dispatch(registerCurrentUser(user, currentImage));
      // navigation.removeListener();
      navigation.navigate('FaceRegistrationSuccess');
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 1,
      //     routes: [
      //       { name: 'FaceRegistration' },
      //       { name: 'FaceRegistrationProcess' },
      //     ],
      //   }),
      // );
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
    fontFamily: cStyle.fonts.medium,
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
    // borderWidth: 3,
    // borderColor: 'red',
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
    // margin: 10,
  },
  buttonText: {
    ...cStyle.redButtonText,
    fontSize: 20,
  },
  buttonTextDismiss: {
    ...cStyle.redButtonText,
    fontSize: 20,
    color: cStyle.colors.highlight,
  },
});

export default FaceRegistrationProcess;
