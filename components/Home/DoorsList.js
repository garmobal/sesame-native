import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import Door from './Door';

function DoorsList({ navigation }) {
  // GLOBAL STATE
  const doors = useSelector((state) => state.doors);

  // RENDER
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.doorsContainer}
      >
        {doors.length !== 0 ? (
          // doors.map((door) => (
          //   <Door door={door} key={door.did} navigation={navigation} />
          // ))
          <SafeAreaView>
            <FlatList
              contentContainerStyle={styles.flatList}
              horizontal={true}
              data={doors}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Door door={item} navigation={navigation} />
              )}
            />
          </SafeAreaView>
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
    // borderWidth: 3,
  },
  flatList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderWidth: 3,
  },
  doorsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DoorsList;
