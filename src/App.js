import React from "react";
import "./Sass/App.scss";
import Board from "./Components/Board";
import Title from "./Components/Title";
import sudoku from "sudoku-umd";
import Controls from "./Components/Controls";
import StartingView from "./Components/StartingView";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      playing: false,
      level: "",
      initialBoard: "",
      boardArr: [],
      clicked: "",
      highlight: [],
      solvedSudoku: [],
      editedList: []
    };
  }

  onBoardChange = (event, i) => {
    let initialBoard = [...this.state.initialBoard];
    this.editedList(this.state.initialBoard);
    let changedBoard = this.state.boardArr;
    changedBoard[i] =
      changedBoard[i] === "." ? event.target.value : initialBoard[i];
    this.setState({
      boardArr: changedBoard
    });
    this.saveGame();
  };

  editedList = board => {
    let initialBoard = [...board];
    let editedList = [];
    for (let index = 0; index < board.length; index++) {
      if (initialBoard[index] === ".") {
        editedList.push(index);
      }
    }
    this.setState({ editedList: editedList });
  };

  saveGame = () => {
    let stateSerialized = JSON.stringify(this.state);
    window.localStorage.setItem("state", stateSerialized);
  };

  lastSession = () => {
    let storage = JSON.parse(window.localStorage.getItem("state"));
    this.setState({ ...storage });
  };

  newGame = () => {
    let nextGame = sudoku.generate(this.state.level);
    this.editedList(nextGame);
    this.setState({
      solvedSudoku: sudoku.solve([...nextGame]),
      initialBoard: [...nextGame],
      boardArr: [...nextGame]
    });
    this.saveGame();
  };

  resetGame = () => {
    let onGoing = this.state.initialBoard;
    this.setState({
      boardArr: onGoing
    });
  };

  solveGame = () => {
    let solved = [...this.state.solvedSudoku];
    this.editedList(this.state.initialBoard);
    this.setState({ boardArr: solved });
  };

  checkGame = () => {
    let check = this.state.boardArr.join("");
    sudoku.solve(check) === check
      ? alert("Well done u did it !")
      : alert("You're close but not close enough");
  };

  assignDifficulty = event => {
    const board = sudoku.generate(event.target.value);
    this.setState({
      solvedSudoku: sudoku.solve(board),
      playing: true,
      level: event.target.value,
      initialBoard: [...board],
      boardArr: [...board]
    });
    this.saveGame();
    this.editedList([...board]);
  };

  highlight = index => {
    let x = Math.floor(index / 9);
    let row = [];
    for (let i = 0; i < 9; i++) {
      row.push(x * 9 + i);
    }
    let y = this.state.solvedSudoku;
    let grid = sudoku.board_string_to_grid(y);
    let position = grid[[x]].indexOf([...y][index]);
    let col = [];
    for (let i = 0; i < 9; i++) {
      col.push(i * 9 + position);
    }
    this.setState({
      highlight: [...row, ...col]
    });
  };

  highlightHandler = (event, index) => {
    this.setState({
      clicked: index
    });
    this.highlight(index);
  };

  changeDifficulty = () => {
    let playing = this.setState.playing;
    this.setState({ playing: playing });
  };

  render() {
    return (
      <div
        className="App"
        onClick={
          this.state.playing === true
            ? () => {
                this.saveGame();
                this.editedList(this.state.initialBoard);
              }
            : null
        }
      >
        {!this.state.playing ? (
          <StartingView level={this.assignDifficulty} last={this.lastSession} />
        ) : (
          <div className="theApp">
            <div>
              <Title />
              <Board
                boardArr={this.state.boardArr}
                onBoardChange={this.onBoardChange}
                highlightHandler={this.highlightHandler}
                highlight={this.state.highlight}
                clicked={this.state.clicked}
                editedList={this.state.editedList}
              />
            </div>
            <Controls
              newGame={this.newGame}
              reset={this.resetGame}
              check={this.checkGame}
              solved={this.solveGame}
              changeDiff={this.changeDifficulty}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
