import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';

import { fetchDoors } from './store/actions/doorsActions';
import Home from './screens/Home';
import FaceRecognition from './screens/FaceRecognition';

const Stack = createStackNavigator();

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
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
