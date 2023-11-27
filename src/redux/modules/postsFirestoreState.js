import { DB } from "fb/myfirebase";
import { doc, setDoc, deleteDoc, addDoc, serverTimestamp } from "firebase/firestore";

const SUBSCRIBE_POSTSFIRESTORE = "postsFirestore/SUBSCRIBE_AUTH";
const SET_POSTSFIRESTORE = "postsFirestore/SET_FIRESTORE";
const DELETE_POSTSFIRESTORE = "postsFirestore/DELETE_FIRESTORE";

export const subscribePostsFirestore = (payload) => {
  return {
    type: SUBSCRIBE_POSTSFIRESTORE,
    payload
  };
};

export const setPostsFirestore = (payload) => {
  return {
    type: SET_POSTSFIRESTORE,
    payload
  };
};
export const deletePostsFirestore = (payload) => {
  return {
    type: DELETE_POSTSFIRESTORE,
    payload
  };
};

const initialState = { posts: [], loading: true };

const postsFirestoreState = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBE_POSTSFIRESTORE: {
      return { ...state, posts: action.payload, loading: false };
    }
    //
    case SET_POSTSFIRESTORE: {
      (async () => {
        // SetDoc은 collection이 아닌 doc을인자로 사용 doc에는 DB,콜렉션네임,문서아이디를 인자로 전달 문서아이디 동일한경우 덮어씌움
        // 덮어씌운데이터가 이전과 동일할 경우 실시간감지에서 변경사항을 감지하지않는듯
        // 추가 수정 동시관리 (기능 및 사용방법 동일)
        await setDoc(doc(DB, "posts", action.payload.postid), {
          ...action.payload,
          timesteamp: action.payload.timesteamp ? action.payload.timesteamp.toDate() : serverTimestamp()
        });
      })();

      return state;
    }
    case DELETE_POSTSFIRESTORE: {
      (async () => {
        //삭제 payload로 문서id를 받아야함
        await deleteDoc(doc(DB, "posts", action.payload.postid));
      })();

      return state;
    }

    default:
      return state;
  }
};

export default postsFirestoreState;
