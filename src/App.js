import { useEffect } from "react";
import { handleInitialData } from "./actions/shared";
import { connect } from "react-redux";

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);
  return (
    <div>
      Hello!
    </div>
  );
}

export default connect()(App);
