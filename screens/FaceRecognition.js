import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

function FaceRecognition({ navigation }) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
        <Text>Face Recognition Page</Text>
      </TouchableOpacity>
    </View>
  );
}

export default FaceRecognition;
