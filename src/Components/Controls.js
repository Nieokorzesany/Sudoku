import React from "react";
import "../Sass/Controls.scss";
import Wrapper from "./Wrapper";

const Controls = props => {
  return (
    <Wrapper>
      <div className="Controls">
        <button onClick={() => props.check()}>Check</button>
        <button onClick={() => props.newGame()}>New Game</button>
        <button onClick={() => props.solved()}>Solve</button>
        <button onClick={() => props.reset()}>Restart</button>
        <button onClick={() => props.changeDiff()}>Change Difficulty</button>
      </div>
    </Wrapper>
  );
};

export default Controls;
