import React from 'react';
import { Text, View, Button } from 'react-native';
import * as style from '../style';

function FaceRegistration({ navigation }) {
  return (
    <View>
      <Text>
        Some explanation about what the recognition process will be like LOL
      </Text>
      <Button
        title="Get started!"
        onPress={() => navigation.navigate('FaceRegistrationProcess')}
      />

      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
        <Text>Face Registration Page</Text>
      </TouchableOpacity> */}
    </View>
  );
}

export default FaceRegistration;
