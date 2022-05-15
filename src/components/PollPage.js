import { Container, Card, Button, Image, Row, Col, ProgressBar } from "react-bootstrap";
import { connect } from "react-redux";
import { CheckCircleFill } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

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
        <Container>
            <Card style={{
                textAlign: "center",
                width: "80%",
                padding: "20px",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "25px"
            }}>
                <Card.Body>
                    <Card.Title as="h2">Poll by {name}</Card.Title>
                    <Image roundedCircle alt={`avatar of ${name}`} src={avatarURL} />
                    <Container >
                        <h3 style={{ marginTop: "20px" }}>Would You Rather</h3>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Header as="h5"
                                        style={!props.newFlag && props.voted === "optionOne" ? { background: "#5b5" } : {}}>
                                        {!props.newFlag && props.voted === "optionOne" ? <CheckCircleFill /> : ""}
                                        {' '}
                                        {optionOne.text}
                                    </Card.Header>
                                    {!props.newFlag ?
                                        <div>
                                            <label style={{ marginTop: "10px" }}>No. of employees who voted: {optOneCount}</label>
                                            <ProgressBar now={optOnePer} label={`${optOnePer}%`} style={{ marginTop: "10px" }} />
                                        </div>
                                        :
                                        <Button size="lg" variant="primary" value="optionOne" onClick={handleVote}>Click</Button>
                                    }
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Header as="h5"
                                        style={!props.newFlag && props.voted === "optionTwo" ? { background: "#5b5" } : {}}>
                                        {!props.newFlag && props.voted === "optionTwo" ? <CheckCircleFill /> : ""}
                                        {' '}
                                        {optionTwo.text}
                                    </Card.Header>
                                    {!props.newFlag ?
                                        <div>
                                            <label style={{ marginTop: "10px" }}>No. of employees who voted: {optTwoCount}</label>
                                            <ProgressBar now={optTwoPer} label={`${optTwoPer}%`} style={{ marginTop: "10px" }} />
                                        </div>
                                        :
                                        <Button size="lg" variant="primary" value="optionTwo" onClick={handleVote}>Click</Button>
                                    }
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </Container>
    )
}

PollPage.propTypes = {
    qID: PropTypes.string.isRequired,
    submitVote: PropTypes.func.isRequired,
    newFlag: PropTypes.bool.isRequired,
    voted: PropTypes.string,
}

const mapStateToProps = ({ questions, users }, props) => {
    const poll = questions[props.qID];

    return {
        poll,
        user: users[poll.author],
    }
}
export default connect(mapStateToProps)(PollPage);