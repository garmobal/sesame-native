import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

function Home({ navigation }) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('FaceRecognition');
        }}
      >
        <Text>Home Page</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;
