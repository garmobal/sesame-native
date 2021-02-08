import React, { useEffect } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import * as cStyle from '../style';
import { clearCurrentUserImages } from '../store/actions/registrationActions';

function FaceRegistration({ navigation }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCurrentUserImages());
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeText}>
          Welcome to the registration process: some more explanation here
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
    fontSize: 30,
    textAlign: 'center',
    color: '#8E8E8E',
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
