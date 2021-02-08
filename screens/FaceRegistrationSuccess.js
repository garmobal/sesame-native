import React from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { StackActions } from '@react-navigation/native';

import * as cStyle from '../style';

const FaceRegistrationSuccess = ({ navigation }) => {
  const registrationStatus = useSelector((state) => state.registrationStatus);

  let content;
  if (registrationStatus.status === 'pending') {
    content = (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator
          animating={true}
          size="large"
          color={cStyle.colors.highlight}
        />
      </View>
    );
  } else if (registrationStatus.status === 'success') {
    content = (
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            Congratulations Alba! You're face is now registered!
          </Text>
          <Text style={styles.entry}>This is your manual entry code:</Text>
          <Text style={styles.code}>293847</Text>
        </View>
        <View style={styles.goHomeButtonContainer}>
          <Pressable
            style={styles.goHomeButton}
            onPress={() => navigation.dispatch(StackActions.popToTop())}
          >
            <Text style={styles.goHomeButtonText}>Ok</Text>
          </Pressable>
        </View>
      </View>
    );
  } else {
    content = (
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>Something went wrong</Text>
        </View>
        <View style={styles.goHomeButtonContainer}>
          <Pressable
            style={styles.goHomeButton}
            onPress={() => navigation.dispatch(StackActions.popToTop())}
          >
            <Text style={styles.goHomeButtonText}>Ok</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return content;
};

export default FaceRegistrationSuccess;

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  messageContainer: {
    flex: 5,
    ...cStyle.whiteCard,
    margin: 20,
    padding: 30,
  },
  message: {
    marginTop: 70,
    flex: 3,
    textAlign: 'center',
    fontSize: 25,
    lineHeight: 40,
    color: cStyle.colors.darkest,
    fontFamily: cStyle.fonts.medium,
  },
  entry: {
    marginTop: 30,
    flex: 1,
    fontSize: 18,
    lineHeight: 40,
    color: cStyle.colors.fontColor,
  },
  code: {
    flex: 2,
    fontFamily: cStyle.fonts.bold,
    fontSize: 50,
    color: cStyle.colors.highlight,
  },
  goHomeButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goHomeButton: {
    // flex: 1,
    ...cStyle.redButton,
    width: '80%',
  },
  goHomeButtonText: {
    ...cStyle.redButtonText,
    fontFamily: cStyle.fonts.regular,
    fontSize: 18,
  },
});
