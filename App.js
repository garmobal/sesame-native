import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import FaceRecognition from './screens/FaceRecognition';

import registrationReducer from './store/reducers/registration';
import doorsReducer from './store/reducers/doors';

const Stack = createStackNavigator();

const rootReducer = combineReducers({
  registration: registrationReducer,
  doors: doorsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="FaceRecognition" component={FaceRecognition} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
