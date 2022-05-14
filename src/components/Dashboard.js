import { connect } from "react-redux";
import Question from "./Question";
import { Card, Container } from "react-bootstrap";

const Dashboard = (props) => {
    return (
        <Container style={{ padding: "10px" }}>
            {props.newQIds.length > 0 ?
                <Card border="primary">
                    <Card.Header style={{ textAlign: "center", fontWeight: "bold" }}>New Questions</Card.Header>
                    <Card.Body className="questions-grid">
                        {props.newQIds.map((id) => (
                            <li key={id}>
                                <Question qID={id} />
                            </li>
                        ))}
                    </Card.Body>
                </Card>
                : ""}
            {props.doneQIds.length > 0 ?
                <div>
                    <br />
                    <Card border="secondary">
                        <Card.Header style={{ textAlign: "center", fontWeight: "bold" }}>Answered</Card.Header>
                        <Card.Body className="questions-grid">
                            {props.doneQIds.map((id) => (
                                <li key={id}>
                                    <Question qID={id} />
                                </li>
                            ))}
                        </Card.Body>
                    </Card>
                </div>
                : ""}
        </Container>
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