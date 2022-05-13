import { connect } from "react-redux";

const PollPage = (props) => {
    const { optionOne, optionTwo } = props.poll;
    const { name, avatarURL } = props.user;

    const optOneCount = optionOne.votes.length;
    const optTwoCount = optionTwo.votes.length;
    const sum = optOneCount + optTwoCount;
    const optOnePer = sum === 0 ? 0 : Math.round((optOneCount / sum) * 100);
    const optTwoPer = sum === 0 ? 0 : Math.round((optTwoCount / sum) * 100);

    const handleVote = (e) => {
        props.submitVote(e.target.value);
    }
    return (
        <div>
            <h3>Poll by {name}</h3>
            <img alt={`avatar of ${name}`} src={avatarURL} />
            <p>Would You Rather</p>
            <div>
                <p>{optionOne.text}</p>
                {!props.newFlag ?
                    <div>
                        <p>{optOnePer}%</p>
                        <p>{optOneCount}</p>
                        {props.voted === "optionOne" ? <p>You have voted</p> : ""}
                    </div>
                    :
                    <button value="optionOne" onClick={handleVote}>Click</button>
                }
            </div>
            <div>
                <p>{optionTwo.text}</p>
                {!props.newFlag ?
                    <div>
                        <p>{optTwoPer}%</p>
                        <p>{optTwoCount}</p>
                        {props.voted === "optionTwo" ? <p>You have voted</p> : ""}
                    </div>
                    :
                    <button value="optionTwo" onClick={handleVote}>Click</button>
                }
            </div>
        </div>
    )
}

const mapStateToProps = ({ questions, users }, props) => {
    const poll = questions[props.qID];

    return {
        poll,
        user: users[poll.author],
    }
}
export default connect(mapStateToProps)(PollPage);