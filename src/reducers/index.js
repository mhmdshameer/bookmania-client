import { combineReducers } from "redux";
import authReducers from "./auth";
import postReducer from "./post";

export default combineReducers({authReducers, postReducer});