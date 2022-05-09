import { combineReducers } from "redux";
import questions from "./questions";
import users from "./users";
import loggedInUser from "./loggedinUser";
import { loadingBarReducer } from "react-redux-loading-bar";

export default combineReducers({
    questions,
    users,
    loggedInUser,
    loadingBar: loadingBarReducer,
})