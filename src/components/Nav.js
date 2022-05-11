import { Link } from "react-router-dom";
import { handleLogin } from "../actions/loggedinUser";
import { useState } from "react";

const Nav = ({ id, name, avatar }) => {
    const [btnText, setBtnText] = useState("LogOut");
    const loginlogout = (e) => {
        e.preventDefault();
        if (btnText === "LogOut") {
            //handleLogin(null);
            setBtnText("LogIn");
        } else {
            //handleLogin(id);
            setBtnText("LogOut");
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
                <li>
                    <div>
                        {btnText === "LogOut" ?
                            <div>
                                <img alt={`avatar of ${name}`} height="30px" width="30px" src={avatar} />
                                <label>{name}</label>
                            </div>
                            : ""}
                        <button onClick={loginlogout}>{btnText}</button>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;