import * as actions from '../actions/actionTypes';
// import { registerUser } from '../../services/azureAPI';
import base64ToArrayBuffer from 'base64-arraybuffer';

export const setCurrentImage = (img) => {
  return { type: actions.SET_CURRENT_IMAGE_REGISTRATION, payload: img };
};

export const clearCurrentImage = () => {
  return { type: actions.DELETE_CURRENT_IMAGE_REGISTRATION };
};

export const addImage = (img) => {
  const octetStream = base64ToArrayBuffer.decode(img.base64);
  return { type: actions.ADD_CURRENT_USER_IMAGE, payload: octetStream };
};

export const registerCurrentUser = (user, img) => {
  // const id = user.aid;
  // const images = [...user.images, ...img];
  // return (dispatch) => {
  //   registerUser(id, images)
  //     .then((key) =>
  //       dispatch({ type: actions.REGISTRATION_SUCCESS, payload: key }),
  //     )
  //     .catch((err) =>
  //       dispatch({ type: actions.REGISTRATION_FAIL, payload: err }),
  //     );
  // };
  return { type: actions.REGISTRATION_SUCCESS, payload: '1232131' };
};

export const clearCurrentUser = () => {
  return (dispatch) => {
    dispatch({ type: actions.CLEAR_CURRENT_USER });
  };
};
