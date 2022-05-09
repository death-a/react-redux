import { RECEIVE_QUESTIONS, ADD_QUESTION, ADD_QUESTION_ANSWER } from "../actions/questions";

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
        case ADD_QUESTION_ANSWER:
            return {
                ...state,
                [actions.qid]: {
                    ...state[actions.qid],
                    [actions.answer]: {
                        ...state[actions.qid][actions.answer],
                        votes: state[actions.qid][actions.answer].votes.concat([actions.authedUser]),
                    }
                }
            }
        default:
            return state;
    }
}