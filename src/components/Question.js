import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/helper";

const Question = (props) => {
    const { author, timestamp, id } = props.question;
    return (
        <div>
            <h3>{author}</h3>
            <span>{formatDate(timestamp)}</span><br />
            <Link to={`/question/${id}`}>Show</Link>
        </div>
    )
}

const mapStateToProps = ({ questions }, { qID }) => {
    const question = questions[qID];

    return {
        question,
    }
}

export default connect(mapStateToProps)(Question);