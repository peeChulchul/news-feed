import { createStore } from "redux";
import { combineReducers } from "redux";
import authState from "redux/modules/authState";
import postsFirestoreState from "redux/modules/postsFirestoreState";
import modalState from "redux/modules/modalState";
import storage from "redux/modules/storage";
const rootReducer = combineReducers({
  modalState,
  authState,
  postsFirestoreState,
  storage
});
const store = createStore(rootReducer);

export default store;
