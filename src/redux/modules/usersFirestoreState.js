import { DB } from "fb/myfirebase";
import { doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";

const SUBSCRIBE_CURRENTUSER = "usersFirestore/SUBSCRIBE_CURRENTUSER";
const SUBSCRIBE_USERSFIRESTORE = "usersFirestore/SUBSCRIBE";
const SET_USERSFIRESTORE = "usersFirestore/SET_FIRESTORE";
const DELETE_USERSFIRESTORE = "usersFirestore/DELETE_FIRESTORE";
const UPDATE_USERSFIRESTORE = "usersFirestore/UPDATE_FIRESTORE";

export const subscribeusersFirestore = (payload) => {
  return {
    type: SUBSCRIBE_USERSFIRESTORE,
    payload
  };
};
export const subscribeCurrentUser = (payload) => {
  return {
    type: SUBSCRIBE_CURRENTUSER,
    payload
  };
};
export const setUsersFirestore = (payload) => {
  return {
    type: SET_USERSFIRESTORE,
    payload
  };
};
export const updateUsersFirestore = (payload) => {
  return {
    type: UPDATE_USERSFIRESTORE,
    payload
  };
};
export const deleteUsersFirestore = (payload) => {
  return {
    type: DELETE_USERSFIRESTORE,
    payload
  };
};

const initialState = { users: [], loading: true, currentUser: null };

const usersFirestoreState = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBE_CURRENTUSER: {
      // 유저 정보가 변경될때 currentUser에 uid를 넣어줌
      const currentUser = state.users.find((user) => user.uid === action.payload);

      return { ...state, currentUser: currentUser ? currentUser : null };
    }

    case SUBSCRIBE_USERSFIRESTORE: {
      return { ...state, users: action.payload, loading: false };
    }
    case SET_USERSFIRESTORE: {
      (async () => {
        // SetDoc은 collection이 아닌 doc을인자로 사용 doc에는 DB,콜렉션네임,유저아이디를 인자로 전달 문서아이디 동일한경우 덮어씌움
        // 유저의 경우 게시글작성이나 좋아요에 따른 업데이트가 필요하여 덮어씌우는방식이 아닌 업데이트가 필요
        // set은 유저의 추가에만 사용
        console.log(action.payload.displayName);
        await setDoc(doc(DB, "users", action.payload.uid), {
          ...action.payload,
          displayName: action.payload.displayName === null ? "깃허브 계정입니다." : action.payload.displayName
        });
      })();
      return state;
    }
    case UPDATE_USERSFIRESTORE: {
      (async () => {
        //업데이트 payload로 문서id를 받아야함(uid와 같을예정)
        // 게시글 작성이나 좋아요시 사용자데이터에 작성 게시물 좋아요 등을 추가하는데 사용
        await updateDoc(doc(DB, "users", action.payload.uid), {
          ...action.payload
        });
      })();

      return state;
    }

    case DELETE_USERSFIRESTORE: {
      (async () => {
        //삭제 payload로 문서id를 받아야함 현재 사용안함 (유저삭제기능 없음)
        await deleteDoc(doc(DB, "users", action.payload.uid));
      })();

      return state;
    }

    default:
      return state;
  }
};

export default usersFirestoreState;
