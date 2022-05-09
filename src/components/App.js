import { useEffect } from "react";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";

function App(props) {
  //console.log(props);
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);
  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default connect()(App);
