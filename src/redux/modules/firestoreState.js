import { postsCollection } from "fb/myfirebase";
import { addDoc } from "firebase/firestore";

const SUBSCRIBE_FIRESTORE = "firestore/SUBSCRIBE_AUTH";

const ADD_FIRESTORE = "firestore/ADD_FIRESTORE";

export const subscribeFirestore = (payload) => {
  return {
    type: SUBSCRIBE_FIRESTORE,
    payload
  };
};
export const addFirestore = (payload) => {
  return {
    type: ADD_FIRESTORE,
    payload
  };
};

// CRUD 로직 추가 필요 실시간 감지를 제외한 데이터베이스에 값을 저장하는 로직은 리듀서 내부에서.

const initialState = { posts: [], loading: true };

const firestoreState = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBE_FIRESTORE: {
      return { ...state, posts: action.payload };
    }
    case ADD_FIRESTORE: {
      (async () => {
        await addDoc(postsCollection, {
          ...action.payload
          // content: "테스트입니다",
          // uid: "테스트입니다.",
          // like: 0,
          // category: "오운완",
          // imgs: [
          //   "https://social-phinf.pstatic.net/20140224_181/1393220729495a3K5P_JPEG/1393220562345-1.jpg",
          //   "https://social-phinf.pstatic.net/20220426_269/1650948892717mHyp9_JPEG/829D6050-7839-4E0D-A53D-50BB6E4DD7ED.jpeg"
          // ],
          // hashtag: ["헬스", "복싱"],
          // postid: "테스트입니다."
        });
      })();

      return { ...state };
    }
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

export default firestoreState;
