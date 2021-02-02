import * as actionTypes from './actionTypes';
import { getDoors } from '../../services/doorAPI';

export const fetchDoors = () => {
  return (dispatch) => {
    getDoors().then((doors) => {
      dispatch({ type: actionTypes.SET_DOORS, payload: doors });
    });
  };
};
