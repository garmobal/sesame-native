import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import AppContainer from './AppContainer';
import registrationReducer from './store/reducers/registration';
import { doorsReducer, selectedDoorReducer } from './store/reducers/doors';
import quotesReducer from './store/reducers/quotes';

const rootReducer = combineReducers({
  registration: registrationReducer,
  doors: doorsReducer,
  quotes: quotesReducer,
  selectedDoor: selectedDoorReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
