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
          <Text style={styles.codeInputTitle}>Enter your code:</Text>
          <TextInput
            style={styles.codeInput}
            autoCompleteType="off"
            keyboardType="number-pad"
            maxLength={5}
            onSubmitEditing={inputCodeHandler}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.codeInputTitle}>Scan code</Text>
          <View style={styles.cameraContainer}>
            <TouchableOpacity
              style={styles.camIconTouchable}
              onPress={() => setScanning(true)}
            >
              <Image style={styles.image} source={QRIcon} />
            </TouchableOpacity>
          </View>
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
    backgroundColor: cStyle.colors.background,
  },
  inputContainer: {
    ...cStyle.card,
    width: '80%',
    height: '40%',
  },
  codeInputTitle: {
    color: cStyle.colors.fontColor,
    fontSize: 20,
    width: '70%',
  },
  codeInput: {
    ...cStyle.codeInput,
    width: '70%',
    letterSpacing: 15,
  },
  camIconTouchable: {
    width: 50,
    height: 50,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  cameraContainer: {
    backgroundColor: cStyle.colors.lightest,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    overflow: 'hidden',
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
