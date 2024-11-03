import { combineReducers } from "redux";
import authReducers from "./auth";
import postReducer from "./post";
import userReducer from "./user";

export default combineReducers({authReducers, postReducer, userReducer});