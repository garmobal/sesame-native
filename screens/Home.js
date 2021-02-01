import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import DoorsList from './../components/DoorsList';

function Home({ navigation }) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('FaceRecognition');
        }}
      >
        <DoorsList />
      </TouchableOpacity>
    </View>
  );
}

export default Home;
