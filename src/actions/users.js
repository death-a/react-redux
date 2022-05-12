import { saveUser, signUpUser } from "../utils/api";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_USER = "ADD_USER";

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    };
}

export function addUser(user) {
    return {
        type: ADD_USER,
        user,
    };
}

export function handleAddUser(user) {
    return (dispatch) => {
        return saveUser(user)
            .then((user) => (dispatch(addUser(user))));
    }
}