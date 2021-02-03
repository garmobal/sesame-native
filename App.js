import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {
  imageRegistration,
  userRegistration,
  registrationStatus,
} from './store/reducers/registration';
import AppContainer from './AppContainer';

import { doorsReducer, selectedDoorReducer } from './store/reducers/doors';
import quotesReducer from './store/reducers/quotes';

const rootReducer = combineReducers({
  imageRegistration: imageRegistration,
  user: userRegistration,
  doors: doorsReducer,
  quotes: quotesReducer,
  selectedDoor: selectedDoorReducer,
  registrationStatus: registrationStatus,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
