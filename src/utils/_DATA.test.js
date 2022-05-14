var data = require("./_DATA");

describe('_saveQuestion', () => {
    it('will return formatted question if all data is passed correctly', async () => {
        var question = {
            author: 'michaeljackson',
            optionOne: {
                text: 'take a course on ReactJS',
            },
            optionTwo: {
                text: 'take a course on unit testing with Jest'
            }
        };
        var result = await data._saveQuestion(question);
        expect(result.id).toEqual(Object.keys(question)[0]);
        expect(result.author).toEqual('michaeljackson');
        expect(result.timestamp).toEqual(1489579767190);
        expect(result.optionOne.votes).toEqual([]);
        expect(result.optionOne.text).toEqual('take a course on ReactJS');
        expect(result.optionTwo.votes).toEqual([]);
        expect(result.optionTwo.text).toEqual('take a course on unit testing with Jest');
    });

    it('will return error if data passed is incorrect', async () => {
        var wrongQuestion = {
            optionOne: {
                text: 'take a course on ReactJS',
            }
        };
        await expect(data._saveQuestion(wrongQuestion)).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
    })
})