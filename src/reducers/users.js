import { RECEIVE_USERS } from "../actions/users";

export default function users(state = {}, actions) {
    switch (actions.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...actions.users,
            };
        default:
            return state;
    }
}