export const SET_LOGGEDIN_USER = "SET_LOGGEDIN_USER"

export function setLoggedInUser(id) {
    return {
        type: SET_LOGGEDIN_USER,
        id,
    };
}

export function handleLogin(id) {
    return (dispatch) => dispatch(setLoggedInUser(id))
}