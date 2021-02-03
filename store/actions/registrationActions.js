import * as actions from '../actions/actionTypes';
import base64ToArrayBuffer from 'base64-arraybuffer';

export const setCurrentImage = (img) => {
  return { type: actions.SET_CURRENT_IMAGE_REGISTRATION, payload: img };
};

export const clearCurrentImage = (img) => {
  return { type: actions.DELETE_CURRENT_IMAGE_REGISTRATION };
};

export const addImage = (img) => {
  const octetStream = base64ToArrayBuffer.decode(img.base64);
  return { type: actions.ADD_CURRENT_USER_IMAGE, payload: octetStream };
};

export const registerCurrentUser = () => {
  return (dispatch) => {
    // Send user to backend.then(() => ...)
  };
};

export const clearCurrentUser = (user, img) => {
  return (dispatch) => {
    // Send user to backend.then(() => ...)
    dispatch({ type: actions.CLEAR_CURRENT_USER });
  };
};
