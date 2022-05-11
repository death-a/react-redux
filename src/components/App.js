import { useEffect } from "react";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import LoadingBar from "react-redux-loading-bar";
import { Routes, Route } from "react-router-dom";
import Poll from "./Poll";
import NewPoll from "./NewPoll";
import Leaderboard from "./Leaderboard";
import Nav from "./Nav";

function App(props) {
  //console.log(props);
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);
  return (
    <div>
      <LoadingBar />
      <Nav name={props.name} avatar={props.avatar} />
      {props.loading === true ? null : (
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/question/:question_id" element={<Poll />} />
          <Route path="/add" element={<NewPoll />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      )}
    </div>
  );
}

const mapStateToProps = ({ loggedInUser, users }) => ({
  loading: loggedInUser === null,
  name: !users[loggedInUser] ? "" : users[loggedInUser].name,
  avatar: !users[loggedInUser] ? "" : users[loggedInUser].avatarURL,
})

export default connect(mapStateToProps)(App);
