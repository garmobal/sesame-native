import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

function DoorsList() {
  const doors = useSelector((state) => state.doors);

  return (
    <View>
      <Text>{doors.length}</Text>
    </View>
  );
}

export default DoorsList;
