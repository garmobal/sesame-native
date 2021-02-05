import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Door from './Door';

function DoorsList({ navigation }) {
  // GLOBAL STATE
  const doors = useSelector((state) => state.doors);

  // RENDER
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {doors.length !== 0 ? (
          doors.map((door) => (
            <Door door={door} key={door.did} navigation={navigation} />
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
