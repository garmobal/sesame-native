import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import {
  imageRegistration,
  userRegistration,
} from './store/reducers/registration';
import doorsReducer from './store/reducers/doors';
import AppContainer from './AppContainer';

const rootReducer = combineReducers({
  imageRegistration: imageRegistration,
  user: userRegistration,
  doors: doorsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
