import { Link } from "react-router-dom";
import { handleLogin } from "../actions/loggedinUser";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Stack, Image } from "react-bootstrap";
import PropTypes from 'prop-types';

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
        <Stack direction="horizontal" gap={4} className="bg-light border" style={{ padding: "10px" }}>
            <Link to="/" style={{ paddingLeft: "50px" }}>Home</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <Link to="/add">New</Link>
            {props.id !== null ?
                <div className="ms-auto" style={{ paddingRight: "50px" }}>
                    <Image
                        fluid
                        roundedCircle
                        alt={`avatar of ${props.name}`}
                        style={{ height: "35px", width: "35px", marginRight: "10px" }}
                        src={props.avatar.replace('200', '35')} />
                    <label style={{ marginRight: "10px" }}>{props.name}</label>
                    <Button variant="primary" onClick={logout}>Logout</Button>
                </div>
                : ""}
        </Stack>
    );
};

Nav.propTypes = {
    id: PropTypes.string,
}

const mapStateToProps = ({ users }, props) => {
    return {
        name: !users[props.id] ? "" : users[props.id].name,
        avatar: !users[props.id] ? "" : users[props.id].avatarURL,
    }
};

export default connect(mapStateToProps)(Nav);