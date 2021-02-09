import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import * as cStyle from './../style';
import DoorsList from './../components/Home/DoorsList';

function Home({ navigation }) {
  // RENDER
  return (
    <>
      <View style={styles.chooseDoorContainer}>
        <View style={styles.chooseDoorCard}>
          <Text style={styles.chooseDoorText}>
            Please choose the door to enter.
          </Text>
        </View>
      </View>
      <View style={styles.doorsListContainer}>
        <DoorsList navigation={navigation} />
      </View>
      <View style={styles.registerBtnContainer}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            },
            styles.registerBtn,
          ]}
          onPress={() => {
            navigation.navigate('FaceRegistration');
          }}
        >
          <Text style={styles.registerText}>Register</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  chooseDoorContainer: {
    flex: 1,
    ...cStyle.centerItem,
  },
  chooseDoorCard: {
    ...cStyle.whiteCard,
    padding: 40,
  },
  chooseDoorText: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: 'black',
  },
  doorsListContainer: {
    flex: 2,
    ...cStyle.centerItem,
  },
  registerBtnContainer: {
    flex: 1,
    ...cStyle.centerItem,
  },
  registerBtn: {
    ...cStyle.redButton,
    width: '85%',
  },
  registerText: {
    ...cStyle.redButtonText,
    fontSize: 18,
  },
});
export default Home;
