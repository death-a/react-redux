import { RECEIVE_QUESTIONS, ADD_QUESTION } from "../actions/questions";

export default function questions(state = {}, actions) {
    switch (actions.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...actions.questions,
            };
        case ADD_QUESTION:
            return {
                ...state,
                [actions.question.id]: actions.question,
            }
        default:
            return state;
    }
}