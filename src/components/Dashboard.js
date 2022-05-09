import { connect } from "react-redux";

const Dashboard = (props) => {
    //console.log(props.qIDs);
    return (
        <div>
            <ul>
                {props.qIDs.map((id) => (
                    <li key={id}>
                        {id}
                    </li>
                ))}
            </ul>
        </div>
    );
}

const mapStateToProps = ({ questions }) => ({
    qIDs: Object.keys(questions).sort(
        (a, b) => questions[b].timestamp - questions[a].timestamp
    )
});

export default connect(mapStateToProps)(Dashboard);