import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import Door from './Door';

function DoorsList({ navigation }) {
  const doors = useSelector((state) => state.doors);

  return (
    <View>
      {doors.map((door) => (
        <Door door={door} key={door.id} navigation={navigation} />
      ))}
    </View>
  );
}

export default DoorsList;
