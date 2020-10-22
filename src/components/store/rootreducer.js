import { combineReducers } from "redux";
import dataStoreReducer from "../reducers/datastoreReducer";

const rootReducer = combineReducers({
  datastorage: dataStoreReducer,
});

export default rootReducer;
