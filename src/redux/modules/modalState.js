const UPDATE_MODAL = "modal/UPDATE_MODAL";
const OPEN_MODAL = "modal/OPEN_MODAL";
const CLOSE_MODAL = "modal/CLOSE_MODAL";
const LOGIN_MODAL = "modal/LOGIN_MODAL";
const LOGOUT_MODAL = "modal/LOGOUT_MODAL";

export const updateModal = (payload) => {
  return {
    type: UPDATE_MODAL,
    payload
  };
};

export const openModal = () => {
  return {
    type: OPEN_MODAL
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

export const loginModal = () => {
  return {
    type: LOGIN_MODAL
  };
};

export const logoutModal = () => {
  return {
    type: LOGOUT_MODAL
  };
};

const initialState = {
  active: false, //모달이 켜지는지 안켜지는지
  login: false, //로그인 상태
  onSummit: null //onSummit
};

const modalState = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MODAL:
      return { ...state, ...action.payload };
    case OPEN_MODAL:
      return { ...state, active: true };
    case CLOSE_MODAL:
      return { ...state, active: false };
    case LOGIN_MODAL:
      return { ...state, active: false, login: true };
    case LOGOUT_MODAL:
      return { ...state, active: false, login: false };
    default:
      return state;
  }
};

export default modalState;
