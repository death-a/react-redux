import { useEffect } from "react";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import LoadingBar from "react-redux-loading-bar";
import { Routes, Route } from "react-router-dom";
import Poll from "./Poll";

function App(props) {
  //console.log(props);
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);
  return (
    <div>
      <LoadingBar />
      {props.loading === true ? null : (
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/question/:id" element={<Poll />} />
        </Routes>
      )}
    </div>
  );
}

const mapStateToProps = ({ loggedInUser }) => ({
  loading: loggedInUser === null,
})

export default connect(mapStateToProps)(App);
