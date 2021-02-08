import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { setSelectedDoor } from './../../store/actions/doorsActions';

import * as cStyle from './../../style';

import main from './../../assets/main.jpeg';
import cafe from './../../assets/cafe.jpeg';
import berta from './../../assets/berta.jpeg';
import leo from './../../assets/leo.jpeg';

function Door({ door, navigation }) {
  const dispatch = useDispatch();
  let image;
  switch (door.did) {
    case 12:
      image = main;
      break;
    case 15:
      image = cafe;
      break;
    case 13:
      image = leo;
      break;
    case 14:
      image = berta;
      break;
    default:
      image = main;
      break;
  }
  // HELPER FUNCTIONS
  /**
   * Set the selected door in the global state and navigate to the FaceRecognition component.
   */
  const _setSelectedDoor = () => {
    dispatch(setSelectedDoor(door));
    navigation.navigate('FaceRecognition');
  };

  // RENDER
  return (
    <TouchableOpacity onPress={_setSelectedDoor}>
      <View style={styles.container}>
        <Image style={styles.doorImage} source={image} />
        <Text style={styles.doorName}>{door.doorName}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '80%',
    width: 200,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  doorImage: {
    position: 'absolute',
    resizeMode: 'contain',
    width: '100%',
  },
  doorName: {
    position: 'absolute',
    fontFamily: cStyle.fonts.medium,
    color: cStyle.colors.lightest,
    fontSize: 30,
  },
});

export default Door;
