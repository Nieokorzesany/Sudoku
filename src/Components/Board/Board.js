import React from "react";
import Tile from "../Tile/Tile";
import "./Board.scss";

const Board = props => {
  const initBoard = props.board.map((tile, index) => (
    <Tile
      onBoardChange={props.onBoardChange}
      value={tile === "." ? "" : tile}
      key={index}
      index={index}
      clickedTile={props.clickedTile}
      highlight={props.highlight}
      editedList={props.editedList}
      clicked={props.clicked}
    />
  ));

  return <div className={"board"}>{initBoard}</div>;
};

export default Board;
