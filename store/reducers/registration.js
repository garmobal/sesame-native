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

const initialUserRegistration = {
  fetching: 'none',
};

export const userRegistration = (state = initialUserRegistration, action) => {
  switch (action.type) {
    case actions.SET_CURRENT_USER:
      // return { ...action.payload, images: [], fetching: 'success' };
      return {
        firstName: 'Matthieu',
        aid: '12345',
        images: [],
        fetching: 'success',
      };
    case actions.LOADING_CURRENT_USER:
      // return action.payload when we have a backend;
      return {
        fetching: 'pending',
      };
    case actions.SET_CURRENT_USER_ERROR:
      // return error message when we have a backend;
      // return { fetching: 'fail' };
      return {
        firstName: 'Francesco',
        aid: '12345',
        images: [],
        fetching: 'success',
      };
    case actions.CLEAR_CURRENT_USER:
      // return {} when we have a backend;
      return { fetching: 'none' };
    case actions.ADD_CURRENT_USER_IMAGE:
      return { ...state, images: [...state.images, action.payload] };
    case actions.CLEAR_CURRENT_USER_IMAGES:
      return { ...state, images: [] };
    case actions.REGISTRATION_SUCCESS:
      return { ...state, images: [] };
    default:
      return state;
  }
};

// Until we connect a backend
const initialRegistrationStatus = {
  status: 'success',
  doorKey: '1234',
};

export const registrationStatus = (
  state = initialRegistrationStatus,
  action,
) => {
  switch (action.type) {
    case actions.REGISTRATION_SUCCESS:
      if (state.status === 'pending') {
        return {
          status: 'success',
          doorKey: action.payload,
        };
      }
      return state;
    case actions.REGISTRATION_FAIL:
      return { ...state, status: 'fail', doorKey: '' };
    case actions.REGISTRATION_RESET:
      return { status: 'pending', doorKey: '1235', apiCalls: 0 };
    default:
      return state;
  }
};
