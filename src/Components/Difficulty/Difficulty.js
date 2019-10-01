import React from "react";
import "./Difficulty.scss";

const Difficulty = props => {
  return (
    <div className="difficulty">
      <p>Difficulty:</p>
      <select onChange={event => props.changeDiff(event)}>
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
        <option value="very-hard">very hard</option>
        <option value="insane">insane</option>
        <option value="inhuman">inhuman</option>
      </select>
    </div>
  );
};

export default Difficulty;
