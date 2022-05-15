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
import Login from "./Login";
import PageNotFound from "./PageNotFound";

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <div style={{ background: "#fff" }}>
      <LoadingBar />
      <Nav id={props.loggedInUser} />
      {props.loggedInUser === null ?
        <Login /> :
        (<Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/question/:question_id" element={<Poll />} />
          <Route path="/add" element={<NewPoll />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
        )}
    </div>
  );
}

const mapStateToProps = ({ loggedInUser }) => ({
  loggedInUser,
})

export default connect(mapStateToProps)(App);
