import React from "react";
import "./App.scss";
import Board from "./Components/Board/Board";
import sudoku from "sudoku-umd";
import Difficulty from "./Components/Difficulty/Difficulty";
import Controls from "./Components/Controls/Controls";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      playing: false,
      level: "",
      initialBoard: [],
      boardArr: [],
      clicked: "",
      highlight: [],
      solvedSudoku: [],
      editedList: []
    };
  }

  editedList = board => {
    let initialBoard = board;
    let editedList = [];
    for (let index = 0; index < board.length; index++) {
      if (initialBoard[index] === ".") {
        editedList.push(index);
      }
    }
    this.setState({ editedList: editedList });
  };

  highlight = index => {
    let clickedRow = Math.floor(index / 9);
    let row = [];
    for (let i = 0; i < 9; i++) {
      row.push(clickedRow * 9 + i);
    }
    let solvedBoard = this.state.solvedSudoku;
    let grid = sudoku.board_string_to_grid(solvedBoard);
    let position = grid[[clickedRow]].indexOf([...solvedBoard][index]);
    let col = [];
    for (let i = 0; i < 9; i++) {
      col.push(i * 9 + position);
    }
    this.setState({
      highlight: [...row, ...col]
    });
  };

  newGame = () => {
    const board = sudoku.generate(this.state.level);
    this.setState(
      {
        initialBoard: [...board],
        solvedSudoku: [...sudoku.solve(board)],
        boardArr: [...board]
      },
      () => this.editedList(this.state.initialBoard)
    );
  };

  checkGame = () => {
    let check = this.state.boardArr.join("");
    sudoku.solve(check) === check
      ? alert("Well done u did it !")
      : alert("You're close but not close enough");
  };

  solveGame = () => {
    let solved = this.state.solvedSudoku;
    this.setState({ boardArr: solved });
  };

  restartGame = () => {
    this.setState({ boardArr: this.state.initialBoard });
  };

  clickedTile = index => {
    this.setState({ clicked: index }, () => this.highlight(this.state.clicked));
  };

  componentDidMount() {
    this.newGame();
  }

  onBoardChange = (event, i) => {
    let initialBoard = this.state.initialBoard;
    let changedBoard = this.state.boardArr;
    changedBoard[i] =
      changedBoard[i] === "." ? event.target.value : initialBoard[i];
    this.setState({
      boardArr: changedBoard
    });
  };

  onDifficultyChange = event => {
    this.setState({ level: event.target.value }, () => this.newGame());
  };

  saveGame = () => {
    let stateSerialized = JSON.stringify(this.state);
    window.localStorage.setItem("state", stateSerialized);
  };

  lastSession = () => {
    let storage = JSON.parse(window.localStorage.getItem("state"));
    this.setState({ ...storage });
  };

  render() {
    return (
      <div className="App">
        <h1>Sudoku</h1>
        <Difficulty changeDiff={this.onDifficultyChange} />
        <div className="view">
          <Board
            board={this.state.boardArr}
            onBoardChange={this.onBoardChange}
            clickedTile={this.clickedTile}
            highlight={this.state.highlight}
            editedList={this.state.editedList}
            clicked={this.state.clicked}
          />
          <Controls
            check={this.checkGame}
            newGame={this.newGame}
            solved={this.solveGame}
            restart={this.restartGame}
            save={this.saveGame}
            lastSession={this.lastSession}
          />
        </div>
      </div>
    );
  }
}

export default App;
