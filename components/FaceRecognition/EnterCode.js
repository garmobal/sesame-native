import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import * as cStyle from './../../style';

function EnterCode({ _checkCode }) {
  const [code, setCode] = useState(null); //111118=Francesco, 532956=Matthieu
  return (
    <View style={styles.content}>
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
  textInputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  textInput: {
    borderWidth: 2,
    width: '50%',
    padding: 10,
    fontSize: 30,
    borderRadius: 10,
  },
  enterCodeBtnContainer: {
    alignItems: 'center',
    flex: 1,
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
