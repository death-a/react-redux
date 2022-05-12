import { connect } from "react-redux";
import { useState } from "react";
import { validUsername, validPassword } from '../utils/Regex';
import { handleLogin } from "../actions/loggedinUser";

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
        let matchUser = false;
        if (userSelected !== "" && username === userSelected) {
            props.dispatch(handleLogin(userSelected));
            matchUser = true;
        } else {
            const users = JSON.parse(localStorage.getItem("users"));
            if (users !== null) {
                for (const user of users) {
                    if (user["username"] === username && user["password"] !== values.password) {
                        setErrMsg('Username Password mismatch');
                        matchUser = true;
                    } else if (user["username"] === username && user["password"] === values.password) {
                        matchUser = true;
                    }
                }
            }
        }
        if (!matchUser) {
            setErrMsg("User does not exist in database. Please Sign Up!");
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
        const users = JSON.parse(localStorage.getItem("users"));
        if (users !== null) {
            for (const user of users) {
                if (user["username"] === username) {
                    userExists = true;
                }
            }
        }
        if (!errUserName && !errPass && !errName && !userExists) {
            //handleSignUp(username, name, values.password);
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
        <div>
            <p>For faster login use dropdownlist</p>
            <select onChange={handleUserSelection}>
                <option value="">Select a User to login</option>
                {Object.keys(props.users).map((id) => (
                    <option key={id} value={id}>{props.users[id].name}</option>
                ))}
            </select>
            <form >
                <div >
                    <p >{errmsg}</p>
                    <div >
                        <input type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(event) => onhandleChangeUsername(event)} />
                    </div>
                    {
                        (signUp) ?
                            <div >
                                <input type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(event) => onhandleChangeName(event)} />
                            </div>
                            :
                            ''
                    }
                    <div >
                        <input type={values.showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handlePasswordChange("password")} />

                        <span onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {
                                (values.showPassword) ? "Hide" : "Show"
                            }
                        </span>
                    </div>
                    {
                        (signUp) ?
                            <div >
                                <button name="signup"
                                    onClick={onSignUp}>
                                    Sign Up
                                </button>
                                <button name="olduser"
                                    onClick={() => { setSignUp(false); setErrMsg(""); }}>
                                    Already a User?
                                </button>
                            </div>
                            :
                            ""
                    }
                    {
                        (!signUp) ?
                            <div >
                                <button name="login"
                                    onClick={onLogIn}>
                                    Log In
                                </button>
                                <button name="newuser"
                                    onClick={() => { setSignUp(true); setErrMsg(""); }}>
                                    New User? Click here
                                </button>
                            </div>
                            :
                            ""
                    }
                    {
                        (signUp) ?
                            <div style={{ fontSize: "11px", color: "#737373", marginTop: "20px" }}>
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
            </form>
        </div>
    )
}

const mapStateToProps = ({ users }) => ({
    users,
});

export default connect(mapStateToProps)(Login);