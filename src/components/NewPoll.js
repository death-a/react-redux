import { useState } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";

const NewPoll = (props) => {
    const [firstOption, setFirstOption] = useState("");
    const [secondOption, setSecondOption] = useState("");
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        props.dispatch(handleAddQuestion(firstOption, secondOption));

        setFirstOption("");
        setSecondOption("");
        navigate("/");
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
                    <Card.Title as="h5" style={{ color: "#666" }}>Create Your Own Poll</Card.Title>
                    <Card.Subtitle as="h2">Would You Rather</Card.Subtitle>
                    <hr />
                    <Form>
                        <Form.Group className="mb-3" controlId="formFirstQuestion">
                            <Form.Label>First Option</Form.Label>
                            <Form.Control type="text"
                                placeholder="Option One"
                                value={firstOption}
                                onChange={(e) => setFirstOption(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formSecondQuestion">
                            <Form.Label>Second Option</Form.Label>
                            <Form.Control type="text"
                                placeholder="Option Two"
                                value={secondOption}
                                onChange={(e) => setSecondOption(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formSecondQuestion">
                            <Button disabled={(firstOption === "" || secondOption === "")}
                                onClick={handleSubmit}>Submit</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default connect()(NewPoll);