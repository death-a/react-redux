import { Link } from "react-router-dom";
import { handleLogin } from "../actions/loggedinUser";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Nav = (props) => {
    let navigate = useNavigate();

    const logout = (e) => {
        e.preventDefault();
        if (props.id !== null) {
            props.dispatch(handleLogin(null));
            navigate("/");
        }
    }
    return (
        <nav >
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/leaderboard">Leaderboard</Link>
                </li>
                <li>
                    <Link to="/add">New</Link>
                </li>
                {props.id !== null ?
                    <li>
                        <div>
                            <img alt={`avatar of ${props.name}`} height="30px" width="30px" src={props.avatar} />
                            <label>{props.name}</label>
                            <button onClick={logout}>LogOut</button>
                        </div>
                    </li>
                    : ""}
            </ul>
        </nav>
    );
};

const mapStateToProps = ({ users }, props) => {
    return {
        name: !users[props.id] ? "" : users[props.id].name,
        avatar: !users[props.id] ? "" : users[props.id].avatarURL,
    }
};

export default connect(mapStateToProps)(Nav);