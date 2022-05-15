import { connect } from "react-redux";
import { Container, Card, Button, Image, Row, Col, ProgressBar } from "react-bootstrap";

const Leaderboard = (props) => {
    return (
        <Container style={{
            width: "80%",
            padding: "20px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "25px"
        }}>
            {props.leaderboard.length > 0 ?
                <Card >
                    <Card.Header>
                        <Row>
                            <Col>
                                Users
                            </Col>
                            <Col>
                                Answered
                            </Col>
                            <Col>
                                Created
                            </Col>
                        </Row>
                    </Card.Header>
                    <Container>
                        {props.leaderboard.map((user) => (
                            <Row key={user.id} style={{ background: "#eee", padding: "1px" }}>
                                <Col style={{ background: "#fff" }}>
                                    <div style={{ padding: "1px" }}>
                                        <div style={{ background: "#ccc" }}>
                                            <div style={{ float: "left", marginTop: "5px" }}>
                                                <Image roundedCircle alt={`avatar of ${user.name}`} src={user.avatar.replace('200', '35')} />
                                            </div>
                                            <div style={{ float: "left", marginLeft: "10px" }}>
                                                <label style={{ fontSize: "12pt" }}>{user.name}</label><br />
                                                <label style={{ fontSize: "10pt", color: "#666" }}>{user.id}</label>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col style={{ background: "#fff" }}>
                                    <div style={{ marginTop: "5px" }}>{!user.answered ? 0 : user.answered}</div>
                                </Col>
                                <Col style={{ background: "#fff" }}>
                                    <div style={{ marginTop: "5px" }}>{!user.created ? 0 : user.created}</div>
                                </Col>
                            </Row>
                        ))}
                    </Container>
                </Card>
                :
                <Card>
                    <Card.Body>No Result Found</Card.Body>
                </Card>
            }
        </Container>
    )
}

const mapStateToProps = ({ questions, users }) => {
    let sorted_users = [];
    let created = {}, answered = {}, sum = {};
    Object.keys(questions).map((q) => {
        const author = questions[q].author;
        created[author] = !created[author] ? 1 : created[author] + 1;
        sum[author] = !sum[author] ? 1 : sum[author] + 1;

        const optionOne = questions[q].optionOne.votes;
        const optionTwo = questions[q].optionTwo.votes;

        if (optionOne.length > 0) {
            for (const user of optionOne) {
                answered[user] = !answered[user] ? 1 : answered[user] + 1;
                sum[user] = !sum[user] ? 1 : sum[user] + 1;
            }
        }

        if (optionTwo.length > 0) {
            for (const user of optionTwo) {
                answered[user] = !answered[user] ? 1 : answered[user] + 1;
                sum[user] = !sum[user] ? 1 : sum[user] + 1;
            }
        }
    });

    for (const id of Object.keys(users)) {
        const u = {};
        const user = users[id];
        u["id"] = user['id'];
        u["name"] = user['name'];
        u["avatar"] = user['avatarURL'];
        u["created"] = created[user.id];
        u["answered"] = answered[user.id];
        u["sum"] = sum[user.id];
        sorted_users.push(u);
    }

    return {
        leaderboard: sorted_users.sort((a, b) => b.sum - a.sum),
    }
}

export default connect(mapStateToProps)(Leaderboard);