import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setSelectedDoor } from './../store/actions/doorsActions';

function Door({ door, navigation }) {
  const dispatch = useDispatch();

  const _setSelectedDoor = () => {
    dispatch(setSelectedDoor(door));
    navigation.navigate('FaceRecognition');
  };
  return (
    <TouchableOpacity onPress={_setSelectedDoor}>
      <View>
        <Text>{door.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Door;
