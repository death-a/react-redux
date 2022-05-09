import { hideLoading, showLoading } from "react-redux-loading-bar";
import { saveQuestion, saveQuestionAnswer } from "../utils/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    };
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    };
}

export function addQuestionAnswer({ qid, answer, authedUser }) {
    return {
        type: ADD_QUESTION_ANSWER,
        qid,
        answer,
        authedUser,
    };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { loggedInUser } = getState();
        dispatch(showLoading());
        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: loggedInUser,
        }).then((question) => dispatch(addQuestion(question)))
            .then(() => dispatch(hideLoading()));
    }
}

export function handleSaveQuestionAnswer(info) {
    return (dispatch) => {
        return saveQuestionAnswer(info).then((q) => q
            ? dispatch(addQuestionAnswer(info)) :
            console.warn("Error in saving questions answer"))
    }
}