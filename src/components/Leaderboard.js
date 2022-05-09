import { connect } from "react-redux";

const Leaderboard = (props) => {
    return (
        <div>
            {props.leaderboard.length > 0 ?
                <div>
                    <div>
                        <h3>Users</h3>
                        <h3>Answered</h3>
                        <h3>Created</h3>
                    </div>
                    {props.leaderboard.map((user) => (
                        <div>
                            <span>{user.name}</span>
                            <span>{Object.keys(user.answers).length}</span>
                            <span>{user.questions.length}</span>
                        </div>
                    ))}
                </div>
                :
                <p>No Result Found</p>
            }
        </div>
    )
}

const mapStateToProps = ({ users }) => {
    const uIDs = Object.keys(users).sort((a, b) => Object.keys(users[b].answers).length - Object.keys(users[a].answers).length);
    let sorted_users = [];
    for (const id of uIDs) {
        sorted_users.push(users[id]);
    }

    return {
        leaderboard: sorted_users,
    }
}

export default connect(mapStateToProps)(Leaderboard);