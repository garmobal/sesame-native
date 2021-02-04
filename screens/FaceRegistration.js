import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import * as cStyle from '../style';

function FaceRegistration({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeText}>
          Welcome to the registration process
        </Text>
      </View>
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
  welcomeCard: {
    ...cStyle.whiteCard,
    width: '50%',
  },
  welcomeText: {},
  startButton: {
    ...cStyle.redButton,
    width: '30%',
  },
  startButtonText: {
    ...cStyle.redButtonText,
    fontSize: 20,
  },
});
