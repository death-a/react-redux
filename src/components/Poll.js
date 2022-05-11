import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleSaveQuestionAnswer } from "../actions/questions";
import PollPage from "./PollPage";

const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} router={{ location, navigate, params }} />;
    };

    return ComponentWithRouterProp;
};

const Poll = (props) => {
    const handleVote = (answer) => {

        props.dispatch(handleSaveQuestionAnswer({
            qid: props.id,
            answer,
            authedUser: props.loggedInUser,
        }));
    }

    return (
        <PollPage qID={props.id} submitVote={handleVote} newFlag={props.newFlag} voted={props.optionVoted} />
    )
}

const mapStateToProps = ({ questions, loggedInUser }, props) => {
    const { question_id } = props.router.params;
    const poll = questions[id];
    let newFlag = true, optionVoted = null;

    if (poll.optionOne.votes.includes(loggedInUser)) {
        optionVoted = "optionOne";
        newFlag = false;
    } else if (poll.optionTwo.votes.includes(loggedInUser)) {
        optionVoted = "optionTwo";
        newFlag = false;
    }

    return {
        id: question_id,
        loggedInUser,
        newFlag,
        optionVoted,
    }
}

export default withRouter(connect(mapStateToProps)(Poll));