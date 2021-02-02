import React from 'react';
import { View } from 'react-native';

import DoorsList from './../components/DoorsList';

function Home({ navigation }) {
  return (
    <View>
      <DoorsList navigation={navigation} />
    </View>
  );
}

export default Home;
