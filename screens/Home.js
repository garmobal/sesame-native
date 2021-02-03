import React from 'react';
import { StyleSheet, View, Text, Pressable, Dimensions } from 'react-native';

import DoorsList from './../components/Home/DoorsList';

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Sesame Logo</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Sesame</Text>
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
    </View>
  );
}

const centerItem = {
  justifyContent: 'center',
  alignItems: 'center',
  width: Dimensions.get('window').width,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    padding: 10,
    ...centerItem,
  },
  logoContainer: {
    flex: 1.5,
    ...centerItem,
  },
  logo: {
    fontSize: 30,
  },
  titleContainer: {
    flex: 1,
    ...centerItem,
  },
  title: {
    fontSize: 20,
  },
  doorsListContainer: {
    flex: 4,
    ...centerItem,
  },
  registerBtnContainer: {
    flex: 1,
    ...centerItem,
  },
  registerBtn: {
    fontSize: 30,
    padding: 10,
    borderRadius: 10,
  },
  registerText: {
    fontSize: 20,
    padding: 5,
  },
});
export default Home;
