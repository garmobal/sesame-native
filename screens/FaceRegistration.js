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
        <Text style={styles.startButtonText}>Get started!</Text>
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
    flex: 4,
    ...cStyle.whiteCard,
    width: '80%',
    marginTop: 30,
  },
  welcomeText: {
    fontFamily: cStyle.fonts.light,
  },
  startButton: {
    ...cStyle.redButton,
    width: '60%',
    marginVertical: 30,
  },
  startButtonText: {
    ...cStyle.redButtonText,
    fontFamily: cStyle.fonts.regular,
    fontSize: 18,
  },
});
