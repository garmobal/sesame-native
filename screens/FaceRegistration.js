import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import * as s from '../style';

function FaceRegistration({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome to the registration process
      </Text>
      <Pressable
        style={styles.startButton}
        onPress={() => navigation.navigate('FaceRegistrationProcess')}
      >
        <Text style={styles.startButtonText}>Start</Text>
      </Pressable>
    </View>
  );
}

export default FaceRegistration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  welcomeText: {},
  startButton: {
    ...s.redButton,
    width: '30%',
  },
  startButtonText: {
    ...s.redButtonText,
    fontSize: 20,
  },
});
