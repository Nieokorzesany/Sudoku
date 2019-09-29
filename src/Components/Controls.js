import React from "react";
import "../Sass/Controls.scss";

const Controls = props => {
  return (
    <div className="Controls">
      <button onClick={() => props.check()}>Check</button>
      <button onClick={() => props.newGame()}>New Game</button>
      <button onClick={() => props.solved()}>Solve</button>
      <button onClick={() => props.reset()}>Restart</button>
    </div>
  );
};

export default Controls;
