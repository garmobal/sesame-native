import * as actionTypes from './actionTypes';
import getDoors from '../../mockData/doors.mock';

export const fetchDoors = () => {
  return (dispatch) => {
    const doors = getDoors(); // TODO: replace with call to back end
    dispatch({ type: actionTypes.SET_DOORS, payload: doors });
  };
};
