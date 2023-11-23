import { createStore } from "redux";
import { combineReducers } from "redux";
import authState from "redux/modules/authState";
import firestoreState from "redux/modules/firestoreState";
import modalState from "redux/modules/modalState";
import storage from "redux/modules/storage";
const rootReducer = combineReducers({
  modalState,
  authState,
  firestoreState,
  storage
});
const store = createStore(rootReducer);

export default store;
