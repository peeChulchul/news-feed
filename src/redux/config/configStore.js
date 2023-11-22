import { createStore } from "redux";
import { combineReducers } from "redux";
import modalState from "redux/modules/modalState";
const rootReducer = combineReducers({
  modalState
});

const store = createStore(rootReducer);

export default store;
