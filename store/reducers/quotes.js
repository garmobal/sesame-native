import * as actionTypes from '../actions/actionTypes';
const initialQuotes = [];

export default (state = initialQuotes, action) => {
  switch (action.type) {
    case actionTypes.SET_QUOTES:
      return action.payload;
    case actionTypes.ADD_QUOTE:
      return [...state, action.payload];
    case actionTypes.REMOVE_QUOTE:
      return state.filter((quote) => quote !== action.payload);
    default:
      return state;
  }
};
