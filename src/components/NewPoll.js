import { useState } from "react";
import { connect } from "react-redux";

const NewPoll = (props) => {
    const [firstOption, setFirstOption] = useState("");
    const [secondOption, setSecondOption] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        //TODO call savequestion
    }

    return (
        <div>
            <h3>Would You Rather</h3>
            <p>Create your own Poll</p>
            <form onSubmit={handleSubmit}>
                <label >First Option</label>
                <input type="text" placeholder="Option One" value={firstOption} onChange={(e) => setFirstOption(e.target.value)} />
                <label >Second Option</label>
                <input type="text" placeholder="Option Two" value={secondOption} onChange={(e) => setSecondOption(e.target.value)} />
                <button disabled={(firstOption === "" || secondOption === "")}>Submit</button>
            </form>
        </div>
    )
}

export default connect()(NewPoll);