import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { registrationReducer } from './store/reducers/registration';
import { doorsReducer } from './store/reducers/doors';

import * as style from './style';

const rootReducer = combineReducers({
  registration: registrationReducer,
  doors: doorsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: style.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
