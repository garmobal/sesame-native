import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import FaceRecognition from './screens/FaceRecognition';
import FaceRegistration from './screens/FaceRegistration';
import FaceRegistrationProcess from './screens/FaceRegistrationProcess';
import FaceRegistrationCamera from './screens/FaceRegistrationCamera';
import FaceRegistrationSuccess from './screens/FaceRegistrationSuccess';

import {
  imageRegistration,
  userRegistration,
  registrationStatus,
} from './store/reducers/registration';

const Stack = createStackNavigator();

const rootReducer = combineReducers({
  imageRegistration: imageRegistration,
  user: userRegistration,
  registrationStatus: registrationStatus,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function AppContainer() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="FaceRegistrationProcess">
          {/* delete */}
          <Stack.Screen name="FaceRegistration" component={FaceRegistration} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="FaceRecognition" component={FaceRecognition} />
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
    </Provider>
  );
}
