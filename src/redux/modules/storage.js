import { STORAGE } from "fb/myfirebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";

const UPLOAD_STORAGE = "storage/UPLOAD_STORAGE";

export const uploadStorage = (payload) => {
  return {
    type: UPLOAD_STORAGE,
    payload
  };
};

const initialState = {
  posts: [],
  users: [],
  done: false
};

const storage = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_STORAGE: {
      return;
    }
    default:
      return state;
  }
};

export default storage;
