import * as actions from '../actions/actionTypes';
import {
  registerUser /* checkRegistrationCode */,
} from '../../services/userAPI';
import base64ToArrayBuffer from 'base64-arraybuffer';

export const setCurrentImage = (img) => {
  return { type: actions.SET_CURRENT_IMAGE_REGISTRATION, payload: img };
};

export const addImage = (img) => {
  const octetStream = base64ToArrayBuffer.decode(img.base64);
  return (dispatch) => {
    dispatch({ type: actions.ADD_CURRENT_USER_IMAGE, payload: octetStream });
    dispatch({ type: actions.DELETE_CURRENT_IMAGE_REGISTRATION });
  };
};

export const registerCurrentUser = (user, img) => {
  const id = user.aid;
  const octetStream = base64ToArrayBuffer.decode(img.base64);
  const images = [...user.images, octetStream];
  return (dispatch) => {
    registerUser(id, images[0])
      .then((key) => {
        console.log(key);
        dispatch({ type: actions.REGISTRATION_SUCCESS, payload: key });
      })
      .catch((err) =>
        dispatch({ type: actions.REGISTRATION_FAIL, payload: err }),
      );
    registerUser(id, images[1])
      .then((key) => {
        dispatch({ type: actions.REGISTRATION_SUCCESS, payload: key });
      })
      .catch((err) =>
        dispatch({ type: actions.REGISTRATION_FAIL, payload: err }),
      );
    registerUser(id, images[2])
      .then((key) => {
        dispatch({ type: actions.REGISTRATION_SUCCESS, payload: key });
      })
      .catch((err) =>
        dispatch({ type: actions.REGISTRATION_FAIL, payload: err }),
      );
  };
};

export const setCurrentUser = (code) => {
  return (dispatch) => {
    // checkRegistrationCode(code)
    //   .then((data) => {
    //     dispatch({ type: actions.SET_CURRENT_USER, payload: data });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     dispatch({ type: actions.SET_CURRENT_USER_ERROR });
    //   });
    dispatch({ type: actions.LOADING_CURRENT_USER });
    setTimeout(() => {
      dispatch({ type: actions.SET_CURRENT_USER, payload: '982374' });
    }, 1000);
  };
};

export const clearCurrentUser = () => {
  return (dispatch) => {
    dispatch({ type: actions.CLEAR_CURRENT_USER });
    dispatch({ type: actions.DELETE_CURRENT_IMAGE_REGISTRATION });
  };
};

export const clearCurrentUserImages = () => {
  return (dispatch) => {
    dispatch({ type: actions.CLEAR_CURRENT_USER_IMAGES });
    dispatch({ type: actions.DELETE_CURRENT_IMAGE_REGISTRATION });
  };
};

export const resetRegistration = () => {
  return { type: actions.REGISTRATION_RESET };
};
