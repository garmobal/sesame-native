import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setSelectedDoor } from './../../store/actions/doorsActions';

function Door({ door, navigation }) {
  const dispatch = useDispatch();

  const _setSelectedDoor = () => {
    dispatch(setSelectedDoor(door));
    navigation.navigate('FaceRecognition');
  };
  return (
    <TouchableOpacity onPress={_setSelectedDoor}>
      <View style={styles.container}>
        <Text>{door.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    height: '100%',
    width: 200,
    marginLeft: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Door;
