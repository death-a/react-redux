import { connect } from "react-redux";
import { useState } from "react";
import { validUsername, validPassword } from '../utils/Regex';
import { handleLogin } from "../actions/loggedinUser";
import { handleAddUser } from "../actions/users";
import { Container, Card, Form, Button, InputGroup } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

const Login = (props) => {
    const [signUp, setSignUp] = useState(false);
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [values, setValues] = useState({
        password: "",
        showPassword: false,
    });
    const [errmsg, setErrMsg] = useState("");
    const [userSelected, setUserSelected] = useState("");

    const onLogIn = (e) => {
        e.preventDefault();
        if (username === "" && values.password === "") {
            setErrMsg("");
        }
        let userExists = false;
        if (props.users !== null) {
            Object.keys(props.users).map((id) => {
                if (id === username && values.password === props.users[id].password) {
                    userExists = true;
                }
            });
        }
        if (userExists) {
            props.dispatch(handleLogin(userSelected));
        } else {
            setErrMsg("Username or Password incorrect");
        }
    }

    const onSignUp = (e) => {
        e.preventDefault();
        let errUserName = false, errPass = false, errName = false, userExists = false;

        if (!validUsername.test(username)) {
            errUserName = true;
        }
        if (!validPassword.test(values.password)) {
            errPass = true;
        }
        if (name.trim() === "") {
            errName = true;
        }

        if (props.users !== null) {
            Object.keys(props.users).map((id) => {
                if (id === username) {
                    userExists = true;
                }
            })
        }
        if (!errUserName && !errPass && !errName && !userExists) {
            let user = {};
            user["id"] = username;
            user["name"] = name;
            user["password"] = values.password;
            user["avatarURL"] = `https://i.pravatar.cc/200?u=${username}`;
            user["answers"] = {};
            user["questions"] = [];

            props.dispatch(handleAddUser(user));
            props.dispatch(handleLogin(username));
        } else if (errUserName) {
            setErrMsg("Please check if all the rules for username are satisfied");
        } else if (errPass) {
            setErrMsg("Some of the rules for setting the password are not satisfied");
        } else if (errName) {
            setErrMsg("Name cannot be blank");
        } else if (userExists) {
            setErrMsg("Username already exists please enter a different username.");
        }
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onhandleChangeUsername = (event) => {
        setUsername(event.target.value);
        setErrMsg("");
    }

    const onhandleChangeName = (event) => {
        setName(event.target.value);
        setErrMsg("");
    }

    const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setErrMsg("");
    };

    const handleUserSelection = (e) => {
        const selectVal = e.target.value;
        if (selectVal === "") {
            setUsername("");
            setName("");
            setValues({ password: "", showPassword: false });
            setErrMsg("");
        } else {
            setUsername(props.users[selectVal].id);
            setName(props.users[selectVal].name);
            setValues({ password: props.users[selectVal].password, showPassword: false });
            setErrMsg("");
        }
        setUserSelected(e.target.value);
    };

    return (
        <Card border={errmsg !== "" ? "danger" : "dark"}
            style={{
                width: "30rem",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "25px"
            }}>
            <Card.Header style={{ background: "#17f", color: "#fff" }}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicUsernameSelect">
                        <Form.Label>For faster login Select User from DropdownList</Form.Label>
                        <Form.Select disabled={signUp} size="lg" onChange={(event) => handleUserSelection(event)} data-testid="username-select">
                            <option value="">Select a User to login</option>
                            {Object.keys(props.users).map((id) => (
                                <option key={id} value={id}>{props.users[id].name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Card.Header>
            <Form style={{ padding: "30px" }}>
                <div>
                    {errmsg !== "" && <label style={{ color: "red" }} className="mb-3" data-testid="error-header">{errmsg}</label>}

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"
                            data-testid="username-input"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(event) => onhandleChangeUsername(event)} />
                    </Form.Group>
                    {
                        (signUp) ?
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text"
                                    data-testid="name-input"
                                    name="name"
                                    placeholder="Enter your Name"
                                    value={name}
                                    onChange={(event) => onhandleChangeName(event)} />
                            </Form.Group>
                            :
                            ''
                    }
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Password</Form.Label>
                        <InputGroup className="mb-2">
                            <Form.Control
                                type={values.showPassword ? "text" : "password"}
                                data-testid="password-input"
                                name="password"
                                placeholder="Password"
                                value={values.password}
                                onChange={handlePasswordChange("password")} />
                            <InputGroup.Text
                                style={{ cursor: "pointer" }}
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}>
                                {(values.showPassword) ?
                                    <EyeFill /> :
                                    <EyeSlashFill />
                                }
                            </InputGroup.Text>
                        </InputGroup>

                    </Form.Group>
                    {
                        (signUp) ?
                            <div>
                                <Form.Group className="mb-3" controlId="formBasicSignUp">
                                    <Button name="signup"
                                        data-testid="signup-button"
                                        disabled={(username === "" || name === "" || values.password === "")}
                                        onClick={onSignUp}>
                                        Sign Up
                                    </Button> {' '}
                                    <Button name="olduser"
                                        variant="link"
                                        data-testid="olduser-button"
                                        onClick={() => { setSignUp(false); setErrMsg(""); }}>
                                        Already a User?
                                    </Button>
                                </Form.Group>
                            </div>
                            :
                            ""
                    }
                    {
                        (!signUp) ?
                            <div>
                                <Form.Group className="mb-3" controlId="formBasicLogin">
                                    <Button name="login"
                                        data-testid="login-button"
                                        disabled={(username === "" || values.password === "")}
                                        onClick={onLogIn}>
                                        Log In
                                    </Button> {' '}
                                    <Button name="newuser"
                                        variant="link"
                                        data-testid="newuser-button"
                                        onClick={() => { setSignUp(true); setErrMsg(""); }}>
                                        New User?
                                    </Button>
                                </Form.Group>
                            </div>
                            :
                            ""
                    }
                    {
                        (signUp) ?
                            <div data-testid="criteria-info"
                                style={{ fontSize: "11px", color: "#737373", marginTop: "20px" }}>
                                <p><strong>Rules for Username:</strong><br></br>
                                    1. min 6 characters long<br></br>
                                    2. max 20 characters<br></br>
                                    3. allowed letters, numbers, dot and underscore.</p>

                                <p><strong>Rules for Password:</strong><br></br>
                                    1. min 4 characters<br></br>
                                    2. one smallcase letter and at least one number</p>
                            </div>
                            :
                            ""
                    }
                </div>
            </Form>
        </Card>
    )
}

const mapStateToProps = ({ users }) => ({
    users,
});

export default connect(mapStateToProps)(Login);