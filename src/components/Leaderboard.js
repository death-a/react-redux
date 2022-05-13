import { connect } from "react-redux";

const Leaderboard = (props) => {
    return (
        <div>
            {props.leaderboard.length > 0 ?
                <div>
                    <div>
                        <span>Users,</span>
                        <span>Answered,</span>
                        <span>Created</span>
                    </div>
                    {props.leaderboard.map((user) => (
                        <div key={user.id}>
                            <span>{user.name},</span>
                            <span>{!user.answered ? 0 : user.answered},</span>
                            <span>{!user.created ? 0 : user.created}</span>
                        </div>
                    ))}
                </div>
                :
                <p>No Result Found</p>
            }
        </div>
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