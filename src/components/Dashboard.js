import { connect } from "react-redux";
import Question from "./Question";

const Dashboard = (props) => {
    return (
        <div>
            {props.newQIds.length > 0 ?
                <div>
                    <h3>New Questions</h3>
                    <ul>
                        {props.newQIds.map((id) => (
                            <li key={id}>
                                <Question qID={id} />
                            </li>
                        ))}
                    </ul>
                </div>
                : ""}
            {props.doneQIds.length > 0 ?
                <div>
                    <h3>Done</h3>
                    <ul>
                        {props.doneQIds.map((id) => (
                            <li key={id}>
                                <Question qID={id} />
                            </li>
                        ))}
                    </ul>
                </div>
                : ""}
        </div>
    );
}

const mapStateToProps = ({ loggedInUser, questions }) => {
    let newQuestions = [];
    let doneQuestions = [];
    Object.keys(questions).map((id) => {
        if (questions[id].optionOne.votes.includes(loggedInUser) ||
            questions[id].optionTwo.votes.includes(loggedInUser)) {
            doneQuestions.push(id);
        } else {
            newQuestions.push(id);
        }
    });

    return {
        newQIds: newQuestions.sort(
            (a, b) => questions[b].timestamp - questions[a].timestamp
        ),
        doneQIds: doneQuestions.sort(
            (a, b) => questions[b].timestamp - questions[a].timestamp
        ),
    }
};

export default connect(mapStateToProps)(Dashboard);