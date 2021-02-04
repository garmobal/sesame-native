import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { setSelectedDoor } from './../../store/actions/doorsActions';

import { card } from './../../style';

import main from './../../assets/main.png';
import cafe from './../../assets/cafe.png';
import berta from './../../assets/berta.png';
import leo from './../../assets/leo.png';

function Door({ door, navigation }) {
  const dispatch = useDispatch();
  let image;
  switch (door.id) {
    case 1:
      image = main;
      break;
    case 2:
      image = cafe;
      break;
    case 3:
      image = leo;
      break;
    case 4:
      image = berta;
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
        <Image style={styles.logo} source={image} />
        <Text>{door.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    ...card,
  },
  logo: {
    // width: 100,
    resizeMode: 'contain',
    width: '30%',
  },
});

export default Door;
