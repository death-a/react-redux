import {
    _getQuestions,
    _getUsers,
    _saveQuestion,
    _saveQuestionAnswer,
    _saveUser
} from "./_DATA";

export function getInitialData() {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    }));
}

export function saveQuestion(question) {
    return _saveQuestion(question);
}

export function saveQuestionAnswer(info) {
    return _saveQuestionAnswer(info);
}

export function saveUser(user) {
    return _saveUser(user);
}

export function signUpUser(user) {
    let users = (localStorage.getItem("employees") === null) ? [] : JSON.parse(localStorage.getItem("employees"));
    let userObj = {}

    userObj["id"] = user.id;
    userObj["name"] = user.name;
    userObj["password"] = user.password;
    userObj["avatarURL"] = user.avatarURL;
    users.push(userObj);

    localStorage.setItem("employees", JSON.stringify(users));
}