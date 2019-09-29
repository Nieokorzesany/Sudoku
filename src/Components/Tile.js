import React from "react";
import "../Sass/Tile.scss";

const Tile = props => {
  let row = props.clicked[1];
  return (
    <input
      type="number"
      min="1"
      max="9"
      value={props.value < 1 || props.value > 9 ? "" : props.value}
      onChange={event => props.onBoardChange(event, props.index)}
      onClick={event => props.highlight(event, props.index)}
      className={props.clicked.includes(props.index) ? "highlight" : ""}
    />
  );
};

export default Tile;
