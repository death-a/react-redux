import { getInitialData } from "../utils/api";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { setLoggedInUser } from "./loggedinUser";

const LOGGEDIN_USER = "billiechan";

export function handleInitialData() {
    return (dispatch) => {
        return getInitialData().then(({ users, questions }) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
            dispatch(setLoggedInUser(LOGGEDIN_USER));
        });
    }
}