import userInfoReducer from "./userInfo";
import imageReducer from "./image";
import { combineReducers } from "redux";

const allReducer = combineReducers( {
    userInfoState: userInfoReducer,
    imageState: imageReducer
});

export default allReducer;