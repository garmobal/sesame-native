import * as actions from '../actions/actionTypes';
import { registerUser } from '../../services/userAPI';
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
  // Spinner
  const id = user.aid;
  const octetStream = base64ToArrayBuffer.decode(img.base64);
  const images = [...user.images, octetStream];
  return (dispatch) => {
    dispatch({ type: actions.DELETE_CURRENT_IMAGE_REGISTRATION });
    setTimeout(() => {
      dispatch({ type: actions.REGISTRATION_SUCCESS, payload: '1235' });
    }, 200);
    setTimeout(() => {
      dispatch({ type: actions.REGISTRATION_SUCCESS, payload: '1235' });
    }, 3000);
    setTimeout(() => {
      dispatch({ type: actions.REGISTRATION_SUCCESS, payload: '1235' });
    }, 1000);
    // registerUser(id, images[0])
    //   .then((key) => {
    //     dispatch({ type: actions.REGISTRATION_SUCCESS, payload: key });
    //   })
    //   .catch((err) =>
    //     dispatch({ type: actions.REGISTRATION_FAIL, payload: err }),
    //   );
    // registerUser(id, images[1])
    //   .then((key) => {
    //     dispatch({ type: actions.REGISTRATION_SUCCESS, payload: key });
    //   })
    //   .catch((err) =>
    //     dispatch({ type: actions.REGISTRATION_FAIL, payload: err }),
    //   );
    // registerUser(id, images[2])
    //   .then((key) => {
    //     dispatch({ type: actions.REGISTRATION_SUCCESS, payload: key });
    //   })
    //   .catch((err) =>
    //     dispatch({ type: actions.REGISTRATION_FAIL, payload: err }),
    //   );
  };
  // return { type: actions.REGISTRATION_SUCCESS, payload: '1232131' };
};

export const clearCurrentUser = () => {
  return (dispatch) => {
    dispatch({ type: actions.CLEAR_CURRENT_USER });
  };
};

export const clearCurrentUserImages = () => {
  return (dispatch) => {
    dispatch({ type: actions.CLEAR_CURRENT_USER_IMAGES });
  };
};

export const resetRegistration = () => {
  return { type: actions.REGISTRATION_RESET };
};
