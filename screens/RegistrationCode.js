import React, { useState } from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';

import * as cStyle from '../style';
import { setCurrentUser } from '../store/actions/registrationActions';
import QRScanner from '../components/FaceRegistration/QRScanner';
import QRIcon from '../assets/registration/camIcon.png';

function RegistrationCode({ navigation }) {
  const [scanning, setScanning] = useState(false);
  const dispatch = useDispatch();

  const inputCodeHandler = (e) => {
    dispatch(setCurrentUser(e.nativeEvent.text));
    navigation.navigate('FaceRegistration');
    setScanning(false);
  };
  const readCodeHandler = (result) => {
    const code = result.data;
    dispatch(setCurrentUser(code));
    navigation.navigate('FaceRegistration');
    setScanning(false);
  };

  let content;
  if (scanning === true) {
    content = (
      <QRScanner scanning={scanning} readCodeHandler={readCodeHandler} />
    );
  } else if (scanning === false) {
    content = (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.codeInputTitleWelcome}>Registration</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.codeInputTitle}>
            Enter your personal code to start the registration process
          </Text>
          <TextInput
            style={styles.codeInput}
            autoCompleteType="off"
            keyboardType="number-pad"
            maxLength={5}
            onSubmitEditing={inputCodeHandler}
          />
        </View>
        <View style={styles.inputContainerQR}>
          <Text style={styles.codeInputTitle}>... or scan QR</Text>
          <View style={styles.cameraContainer}>
            <TouchableOpacity
              style={styles.camIconTouchable}
              onPress={() => setScanning(true)}
            >
              <Image style={styles.image} source={QRIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputMissingContainer}>
          <Text style={styles.codeMissing}>
            Did not receive a registration code? Please check your span folder
            or contact your company.
          </Text>
        </View>
      </View>
    );
  } else {
    content = (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator
          animating={true}
          size="large"
          color={cStyle.colors.highlight}
        />
      </View>
    );
  }
  return content;
}

export default RegistrationCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: cStyle.colors.lightest,
    paddingBottom: 30,
  },
  inputContainer: {
    ...cStyle.card,
    width: '80%',
    // height: '40%',
    // borderWidth: 2,
  },
  inputContainerQR: {
    ...cStyle.card,
    width: '80%',
    // height: '10%',
    justifyContent: 'center',
    // height: '40%',
    // borderWidth: 2,
  },
  codeInputTitleWelcome: {
    // color: '#444',
    color: cStyle.colors.highlight,
    fontFamily: cStyle.fonts.medium,
    fontSize: 40,
    width: '80%',
    textAlign: 'center',
    marginTop: 30,
  },
  codeInputTitle: {
    color: '#444',
    textAlign: 'center',
    fontFamily: cStyle.fonts.regular,
    fontSize: 20,
  },
  codeInput: {
    ...cStyle.codeInput,
    width: '70%',
    letterSpacing: 15,
    margin: 20,
  },
  camIconTouchable: {
    width: 60,
    height: 60,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  inputMissingContainer: {
    ...cStyle.card,
    width: '80%',
  },
  codeMissing: {
    color: cStyle.colors.fontColor,
    textAlign: 'center',
  },
  cameraContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    overflow: 'hidden',
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
