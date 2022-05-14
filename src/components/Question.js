import { Button, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/helper";

const Question = (props) => {
    let navigate = useNavigate();
    const { author, timestamp, id } = props.question;
    const handleShowQuestion = () => {
        navigate(`/question/${id}`);
    }
    return (
        <Card>
            <Card.Body>
                <Card.Title>{author}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{formatDate(timestamp)}</Card.Subtitle>
                <Button variant="primary" onClick={handleShowQuestion}>Show</Button>
            </Card.Body>
        </Card>
    )
}

const mapStateToProps = ({ questions }, { qID }) => {
    const question = questions[qID];

    return {
        question,
    }
}

export default connect(mapStateToProps)(Question);