import userInfoReducer from "./userInfo";
import imageReducer from "./image";
import experimentReducer from "./experiment";
import { combineReducers } from "redux";

const allReducer = combineReducers( {
    userInfoState: userInfoReducer,
    imageState: imageReducer,
    experimentState: experimentReducer
});

export default allReducer;