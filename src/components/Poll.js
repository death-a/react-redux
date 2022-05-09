import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} router={{ location, navigate, params }} />;
    };

    return ComponentWithRouterProp;
};

const Poll = (props) => {
    const { optionOne, optionTwo } = props.poll;
    const { name, avatarURL } = props.user;
    return (
        <div>
            <h3>Poll by {name}</h3>
            <img alt={`avatar of ${name}`} src={avatarURL} />
            <p>Would You Rather</p>
            <div>
                <p>{optionOne.text}</p>
                <button>Click</button>
            </div>
            <div>
                <p>{optionTwo.text}</p>
                <button>Click</button>
            </div>
        </div>
    )
}

const mapStateToProps = ({ questions, users }, props) => {
    const { id } = props.router.params;
    const poll = questions[id];

    return {
        poll,
        user: users[poll.author],
    }
}

export default withRouter(connect(mapStateToProps)(Poll));