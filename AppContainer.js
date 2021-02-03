import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import * as FileSystem from 'expo-file-system';

import { fetchDoors } from './store/actions/doorsActions';
import { fetchQuotes, setQuotes } from './store/actions/quotesActions';
import Home from './screens/Home';
import FaceRecognition from './screens/FaceRecognition';

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
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="FaceRecognition" component={FaceRecognition} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
