var data = require("./_DATA");

describe('_saveQuestion', () => {
    it('will return formatted question if all data is passed correctly', async () => {
        var question = {
            author: 'michaeljackson',
            optionOneText: 'take a course on ReactJS',
            optionTwoText: 'take a course on unit testing with Jest',
        };
        var result = await data._saveQuestion(question);
        expect(result.author).toEqual('michaeljackson');
        expect(result.optionOne.text).toEqual('take a course on ReactJS');
        expect(result.optionTwo.text).toEqual('take a course on unit testing with Jest');
    });

    it('will return error if data passed is incorrect', async () => {
        var wrongQuestion = {
            optionOne: {
                text: 'take a course on ReactJS',
            }
        };
        await expect(data._saveQuestion(wrongQuestion)).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
    });
})

describe('_saveQuestionAnswer', () => {
    it('will return true if all data is passed correctly', async () => {
        var info = {
            authedUser: 'billiechan',
            qid: 'vthrdm985a262al8qx3do',
            answer: 'optionTwo',
        };
        var result = await data._saveQuestionAnswer(info);
        expect(result).toEqual(true);
    });

    it('will return error if data passed is incorrect', async () => {
        var wrongInfo = {
            authedUser: 'billiechan',
            answer: 'optionTwo',
        };
        await expect(data._saveQuestionAnswer(wrongInfo)).rejects.toEqual('Please provide authedUser, qid, and answer');
    });
})

/*describe('_saveUser', () => {
    it('will return user object if all data is passed correctly', async () => {
        var user = {}
        user["id"] = 'willturner';
        user["name"] = 'Will Turner';
        user["password"] = 'pass123';
        var result = await data._saveUser(user);
        expect(result["id"]).toEqual('willturner');
        expect(result["name"]).toEqual('Will Turner');
        expect(result["password"]).toEqual('pass123');
    });

    it('will return error if data passed is incorrect', async () => {
        var wrongInfo = {
            name: 'willturner',
            password: 'pass123',
        };
        await expect(data._saveUser(wrongInfo)).rejects.toEqual('User should have id, name and password');
    });
})*/