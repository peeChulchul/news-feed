import { createStore } from "redux";
import { combineReducers } from "redux";
import authState from "redux/modules/authState";
import modalState from "redux/modules/modalState";
const rootReducer = combineReducers({
  modalState,
  authState
});
const store = createStore(rootReducer);

export default store;
