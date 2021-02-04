import * as actions from '../actions/actionTypes';

const initialImageRegistration = null;

export const imageRegistration = (state = initialImageRegistration, action) => {
  switch (action.type) {
    case actions.SET_CURRENT_IMAGE_REGISTRATION:
      return action.payload;
    case actions.DELETE_CURRENT_IMAGE_REGISTRATION:
      return null;
    default:
      return state;
  }
};

const initialUserRegistration = { name: 'Francesco', id: '12345', images: [] };

export const userRegistration = (state = initialUserRegistration, action) => {
  switch (action.type) {
    case actions.SET_CURRENT_USER:
      return state;
    // return action.payload when we have a backend;
    case actions.CLEAR_CURRENT_USER:
      return { name: 'Francesco', id: '12345', images: [] };
    // return {} when we have a backend;
    case actions.ADD_CURRENT_USER_IMAGE:
      console.log(action.payload);
      console.log(state.images);
      return { ...state, images: [...state.images, action.payload] };
    case actions.CLEAR_CURRENT_USER_IMAGES:
      return { ...state, images: [] };
    default:
      return state;
  }
};

// Success for now until we have a backend
const initialRegistrationStatus = { status: 'success', doorKey: '1234' };

export const registrationStatus = (
  state = initialRegistrationStatus,
  action,
) => {
  switch (action.type) {
    case actions.REGISTRATION_SUCCESS:
      return { status: 'success', doorKey: action.payload };
    case actions.REGISTRATION_FAIL:
      return { status: 'fail', doorKey: '' };
    default:
      return state;
  }
};
