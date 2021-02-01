import * as actionTypes from '../actions/actionTypes';
const initialDoors = [];

export default (state = initialDoors, action) => {
  switch (action.type) {
    case actionTypes.SET_DOORS:
      return action.payload;
    default:
      return state;
  }
};
