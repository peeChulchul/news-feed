import { createStore } from "redux";
import { combineReducers } from "redux";
import postsFirestoreState from "redux/modules/postsFirestoreState";
import modalState from "redux/modules/modalState";
import storage from "redux/modules/storage";
import usersFirestoreState from "redux/modules/usersFirestoreState";
const rootReducer = combineReducers({
  modalState,
  postsFirestoreState,
  usersFirestoreState,
  storage
});
const store = createStore(rootReducer);

export default store;
