import * as actions from '../actions/actionTypes';

export const setCurrentImage = (img) => {
  return { type: actions.SET_CURRENT_IMAGE_REGISTRATION, payload: img };
};
export const addImage = () => {
  return { type: actions.ADD_CURRENT_USER_IMAGE, payload: 1 };
};
