import { connect } from "react-redux";
import { formatDate } from "../utils/helper";

const Question = (props) => {
    const { author, timestamp, optionOne, optionTwo } = props.question;
    return (
        <div>
            <h3>{author}</h3>
            <span>{formatDate(timestamp)}</span><br />
            <strong>Would you rather?</strong><br />
            <p>{optionOne.text}</p>
            <p>{optionTwo.text}</p>
            <button>Show</button>
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