import { DB } from "fb/myfirebase";
import { doc, setDoc } from "firebase/firestore";

const SUBSCRIBE_FIRESTORE = "firestore/SUBSCRIBE_AUTH";
const SET_FIRESTORE = "firestore/SET_FIRESTORE";

export const subscribeFirestore = (payload) => {
  return {
    type: SUBSCRIBE_FIRESTORE,
    payload
  };
};

export const setFirestore = (payload) => {
  return {
    type: SET_FIRESTORE,
    payload
  };
};

// CRUD 로직 추가 필요 실시간 감지를 제외한 데이터베이스에 값을 저장하는 로직은 리듀서 내부에서.

const initialState = { posts: [], loading: true, category: "All" };

const firestoreState = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBE_FIRESTORE: {
      return { ...state, posts: action.payload };
    }
    //
    case SET_FIRESTORE: {
      (async () => {
        // SetDoc은 collection이 아닌 doc을인자로 사용 doc에는 DB,콜렉션네임,문서아이디를 인자로 전달 문서아이디 동일한경우 덮어씌움
        // 덮어씌운데이터가 이전과 동일할 경우 실시간감지에서 변경사항을 감지하지않는듯
        // 추가 수정 동시관리 (기능 및 사용방법 동일)
        await setDoc(
          doc(DB, "posts", action.payload.postid),
          {
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
          },
          { merge: true }
        );
      })();
      return state;
    }
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
