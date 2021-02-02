import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Door from './Door';

function DoorsList({ navigation }) {
  const doors = useSelector((state) => state.doors);

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        {doors.length !== 0 ? (
          doors.map((door) => (
            <Door door={door} key={door.id} navigation={navigation} />
          ))
        ) : (
          <Text>Loading doors</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100%',
  },
});

export default DoorsList;
