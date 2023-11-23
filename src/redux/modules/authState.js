const SUBSCRIBE_AUTH = "auth/SUBSCRIBE_AUTH";

export const subscribeAUth = (payload) => {
  return {
    type: SUBSCRIBE_AUTH,
    payload
  };
};

const initialState = {};

const authState = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBE_AUTH: {
      return { ...state, ...action.payload };
    }
    // case OPEN_MODAL: {
    //   return { ...state, active: true };
    // }
    // case CLOSE_MODAL: {
    //   return { ...state, active: false };
    // }
    // case LOGIN_MODAL: {
    //   return { ...state, active: false, login: true };
    // }
    // case LOGOUT_MODAL: {
    //   return { ...state, active: false, login: false };
    // }
    default:
      return state;
  }
};

export default authState;
