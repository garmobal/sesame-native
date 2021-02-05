import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import * as FileSystem from 'expo-file-system';

import { fetchDoors } from './store/actions/doorsActions';
import { fetchQuotes, setQuotes } from './store/actions/quotesActions';
import Home from './screens/Home';
import FaceRecognition from './screens/FaceRecognition';
import FaceRegistration from './screens/FaceRegistration';
import FaceRegistrationProcess from './screens/FaceRegistrationProcess';
import FaceRegistrationCamera from './screens/FaceRegistrationCamera';
import FaceRegistrationSuccess from './screens/FaceRegistrationSuccess';

const Stack = createStackNavigator();

export default function AppContainer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fileUri = FileSystem.documentDirectory + 'quotes.csv';
    FileSystem.getInfoAsync(fileUri).then((info) => {
      if (!info.exists) {
        dispatch(setQuotes(fileUri));
      } else {
        dispatch(fetchQuotes(fileUri));
      }
    });
    dispatch(fetchDoors());
  }, [dispatch]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="FaceRecognition" component={FaceRecognition} />
        <Stack.Screen name="FaceRegistration" component={FaceRegistration} />
        <Stack.Screen
          name="FaceRegistrationProcess"
          component={FaceRegistrationProcess}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FaceRegistrationCamera"
          component={FaceRegistrationCamera}
        />
        <Stack.Screen
          name="FaceRegistrationSuccess"
          component={FaceRegistrationSuccess}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
