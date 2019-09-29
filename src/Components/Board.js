import React from "react";
import Tile from "./Tile";
import "../Sass/Board.scss";

const Board = props => {
  const initBoard = [...props.boardArr].map((tile, index) => (
    <Tile
      boardArr={props.boardArr}
      value={tile === "." ? "" : tile}
      key={index}
      index={index}
      onBoardChange={props.onBoardChange}
      highlight={props.highlight}
      clicked={props.clicked}
    />
  ));

  return <div className={"board"}>{initBoard}</div>;
};

export default Board;
