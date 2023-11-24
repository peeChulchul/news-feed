const SUBSCRIBE_AUTH = "auth/SUBSCRIBE_AUTH";

export const subscribeAUth = (payload) => {
  return {
    type: SUBSCRIBE_AUTH,
    payload
  };
};

// CRUD 로직 추가 필요 실시간 감지를 제외한 데이터베이스에 값을 저장하는 로직은 리듀서 내부에서.

const initialState = { user: null };

const authState = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBE_AUTH: {
      return { user: action.payload };
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
