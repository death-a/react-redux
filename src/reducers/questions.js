import { RECEIVE_QUESTIONS } from "../actions/questions";

export default function questions(state = {}, actions) {
    switch (actions.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...actions.questions,
            };
        default:
            return state;
    }
}