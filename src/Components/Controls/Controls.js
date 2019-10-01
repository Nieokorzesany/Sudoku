import React from "react";
import "./Controls.scss";

const Controls = props => {
  return (
    <div className="Controls">
      <button onClick={() => props.check()}>Check</button>
      <button onClick={() => props.newGame()}>New Game</button>
      <button onClick={() => props.solved()}>Solve</button>
      <button onClick={() => props.restart()}>Restart</button>
      <button onClick={() => props.save()}>Save</button>
      <button onClick={() => props.lastSession()}>Last Session</button>
    </div>
  );
};

export default Controls;
