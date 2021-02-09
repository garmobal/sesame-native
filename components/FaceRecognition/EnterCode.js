import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import * as cStyle from './../../style';

function EnterCode({ _checkCode }) {
  const [code, setCode] = useState(null); //111118=Francesco, 532956=Matthieu
  return (
    <View style={styles.content}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Enter your door key</Text>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          onChangeText={(text) => setCode(text)}
          value={code}
        />
      </View>

      <View style={styles.enterCodeBtnContainer}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            },
            styles.enterCodeBtn,
          ]}
          onPress={() => {
            if (code !== null && code !== '') {
              _checkCode(code);
              setCode(null);
            } else {
              Alert.alert('Insert a valid code', 'The code must not be empty');
            }
          }}
        >
          <Text style={styles.enterCodeBtnText}>Enter code</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  textContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 30,
    fontFamily: cStyle.fonts.medium,
  },
  textInputContainer: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textInput: {
    marginBottom: 30,
    ...cStyle.codeInput,
    width: '40%',
    letterSpacing: 15,
  },
  enterCodeBtnContainer: {
    alignItems: 'center',
    flex: 10,
  },
  enterCodeBtn: {
    ...cStyle.redButton,
  },
  enterCodeBtnText: {
    ...cStyle.redButtonText,
    fontSize: 18,
  },
});

export default EnterCode;
