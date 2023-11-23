import { DB, postsCollection } from "fb/myfirebase";
import { addDoc, doc, setDoc } from "firebase/firestore";

const SUBSCRIBE_FIRESTORE = "firestore/SUBSCRIBE_AUTH";
const ADD_FIRESTORE = "firestore/ADD_FIRESTORE";
const SET_FIRESTORE = "firestore/SET_FIRESTORE";

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
export const setFirestore = (payload) => {
  return {
    type: SET_FIRESTORE,
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
      // addDoc을 사용하면 3번째 인자인 문서id를 자동으로생성해줌 setDoc의 경우 문서아이디를 지정해야함 (기능적으론 같으나 set의 경우 동일 문서아이디의 경우 덮어씌움)
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

      return state;
    }
    //
    case SET_FIRESTORE: {
      console.log(action.payload);

      (async () => {
        // SetDoc은 collection이 아닌 doc을인자로 사용 doc에는 DB,콜렉션네임,문서아이디를 인자로 전달 문서아이디 동일한경우 덮어씌움
        // 덮어씌운데이터가 이전과 동일할 경우 실시간감지에서 변경사항을 감지하지않는듯
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
