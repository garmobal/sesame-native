import * as actions from '../actions/actionTypes';

const initialImageRegistration = null;

export const imageRegistration = (state = initialImageRegistration, action) => {
  switch (action.type) {
    case actions.SET_CURRENT_IMAGE_REGISTRATION:
      return action.payload;
    case actions.DELETE_CURRENT_IMAGE_REGISTRATION:
      return '';
    default:
      return state;
  }
};

const initialUserRegistration = { name: 'Francesco', id: '12345', images: [] };

export const userRegistration = (state = initialUserRegistration, action) => {
  switch (action.type) {
    case actions.SET_CURRENT_USER:
      return state;
    // return action.payload;
    case actions.ADD_CURRENT_USER_IMAGE:
      return { ...state, images: [...state.images, action.payload] };
    case actions.CLEAR_CURRENT_USER_IMAGES:
      return { ...state, images: [] };
    default:
      return state;
  }
};
