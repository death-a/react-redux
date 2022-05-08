import { SET_LOGGEDIN_USER } from "../actions/loggedinUser";

export default function loggedInUser(state = null, actions) {
    switch (actions.type) {
        case SET_LOGGEDIN_USER:
            return actions.id;
        default:
            return state;
    }
}