let users = {
    billiechan: {
        id: 'billiechan',
        password: 'password123',
        name: 'Billie Chan',
        avatarURL: 'https://i.pravatar.cc/200?img=5',
        answers: {
            "8xf0y6ziyjabvozdd253nd": 'optionOne',
            "6ni6ok3ym7mf1p33lnez": 'optionOne',
            "am8ehyc8byjqgar0jgpub9": 'optionTwo',
            "loxhs1bqm25b708cmbf3g": 'optionTwo'
        },
        questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
    },
    andyterry: {
        id: 'andyterry',
        password: 'abc321',
        name: 'Andy Terry',
        avatarURL: 'https://i.pravatar.cc/200?img=51',
        answers: {
            "vthrdm985a262al8qx3do": 'optionOne',
            "xj352vofupe1dqz9emx13r": 'optionTwo',
        },
        questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
    },
    frankgibbs: {
        id: 'frankgibbs',
        password: 'xyz123',
        name: 'Frank Gibbs',
        avatarURL: 'https://i.pravatar.cc/200?img=13',
        answers: {
            "xj352vofupe1dqz9emx13r": 'optionOne',
            "vthrdm985a262al8qx3do": 'optionTwo',
            "6ni6ok3ym7mf1p33lnez": 'optionOne'
        },
        questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
    },
    eddieharvey: {
        id: 'eddieharvey',
        password: 'pass246',
        name: 'Eddie Harvey',
        avatarURL: 'https://i.pravatar.cc/200?img=12',
        answers: {
            "xj352vofupe1dqz9emx13r": 'optionOne',
        },
        questions: [],
    }
}

let questions = {
    "8xf0y6ziyjabvozdd253nd": {
        id: '8xf0y6ziyjabvozdd253nd',
        author: 'billiechan',
        timestamp: 1467166872634,
        optionOne: {
            votes: ['billiechan'],
            text: 'Build our new application with Javascript',
        },
        optionTwo: {
            votes: [],
            text: 'Build our new application with Typescript'
        }
    },
    "6ni6ok3ym7mf1p33lnez": {
        id: '6ni6ok3ym7mf1p33lnez',
        author: 'frankgibbs',
        timestamp: 1468479767190,
        optionOne: {
            votes: [],
            text: 'hire more frontend developers',
        },
        optionTwo: {
            votes: ['frankgibbs', 'billiechan'],
            text: 'hire more backend developers'
        }
    },
    "am8ehyc8byjqgar0jgpub9": {
        id: 'am8ehyc8byjqgar0jgpub9',
        author: 'billiechan',
        timestamp: 1488579767190,
        optionOne: {
            votes: [],
            text: 'conduct a release retrospective 1 week after a release',
        },
        optionTwo: {
            votes: ['billiechan'],
            text: 'conduct release retrospectives quarterly'
        }
    },
    "loxhs1bqm25b708cmbf3g": {
        id: 'loxhs1bqm25b708cmbf3g',
        author: 'andyterry',
        timestamp: 1482579767190,
        optionOne: {
            votes: [],
            text: 'have code reviews conducted by peers',
        },
        optionTwo: {
            votes: ['billiechan'],
            text: 'have code reviews conducted by managers'
        }
    },
    "vthrdm985a262al8qx3do": {
        id: 'vthrdm985a262al8qx3do',
        author: 'andyterry',
        timestamp: 1489579767190,
        optionOne: {
            votes: ['andyterry'],
            text: 'take a course on ReactJS',
        },
        optionTwo: {
            votes: ['frankgibbs'],
            text: 'take a course on unit testing with Jest'
        }
    },
    "xj352vofupe1dqz9emx13r": {
        id: 'xj352vofupe1dqz9emx13r',
        author: 'frankgibbs',
        timestamp: 1493579767190,
        optionOne: {
            votes: ['frankgibbs', 'eddieharvey'],
            text: 'deploy to production once every two weeks',
        },
        optionTwo: {
            votes: ['andyterry'],
            text: 'deploy to production once every month'
        }
    },
}

function generateUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ ...users }), 1000)
    })
}

export function _getQuestions() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ ...questions }), 1000)
    })
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
    return {
        id: generateUID(),
        timestamp: Date.now(),
        author,
        optionOne: {
            votes: [],
            text: optionOneText,
        },
        optionTwo: {
            votes: [],
            text: optionTwoText,
        }
    }
}

export function _saveQuestion(question) {
    return new Promise((resolve, reject) => {
        if (!question.optionOneText || !question.optionTwoText || !question.author) {
            reject("Please provide optionOneText, optionTwoText, and author");
        }

        const formattedQuestion = formatQuestion(question)
        setTimeout(() => {
            questions = {
                ...questions,
                [formattedQuestion.id]: formattedQuestion
            }

            resolve(formattedQuestion)
        }, 1000)
    })
}

export function _saveQuestionAnswer({ authedUser, qid, answer }) {
    return new Promise((resolve, reject) => {
        if (!authedUser || !qid || !answer) {
            reject("Please provide authedUser, qid, and answer");
        }

        setTimeout(() => {
            users = {
                ...users,
                [authedUser]: {
                    ...users[authedUser],
                    answers: {
                        ...users[authedUser].answers,
                        [qid]: answer
                    }
                }
            }

            questions = {
                ...questions,
                [qid]: {
                    ...questions[qid],
                    [answer]: {
                        ...questions[qid][answer],
                        votes: questions[qid][answer].votes.concat([authedUser])
                    }
                }
            }

            resolve(true)
        }, 500)
    })
}

export function _saveUser(user) {
    return new Promise((resolve, reject) => {
        if (!user.id || !user.name || !user.password) {
            reject("User should have id, name and password");
        }

        setTimeout(() => {
            users = {
                ...users,
                [user.id]: user
            }

            resolve(user)
        }, 1000);
    })
}