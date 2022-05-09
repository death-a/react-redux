import { getInitialData } from "../utils/api";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { setLoggedInUser } from "./loggedinUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";

const LOGGEDIN_USER = "billiechan";

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData().then(({ users, questions }) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
            dispatch(setLoggedInUser(LOGGEDIN_USER));
            dispatch(hideLoading());
        });
    }
}