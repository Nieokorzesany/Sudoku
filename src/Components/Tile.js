import React from "react";
import "../Sass/Tile.scss";

const Tile = props => {
  return (
    <input
      type="number"
      min="1"
      max="9"
      value={props.value < 1 || props.value > 9 ? "" : props.value}
      onChange={event => props.onBoardChange(event, props.index)}
    />
  );
};

export default Tile;
