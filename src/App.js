import React from "react";
import "./Sass/App.scss";
import Board from "./Components/Board";
import Title from "./Components/Title";
import sudoku from "sudoku-umd";
import Controls from "./Components/Controls";
import Wrapper from "./Components/Wrapper";
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
    let editedList = [];
    for (let index = 0; index < initialBoard.length; index++) {
      if (initialBoard[index] === ".") {
        editedList.push(index);
      }
    }
    let changedBoard = this.state.boardArr;
    changedBoard[i] =
      changedBoard[i] === "." ? event.target.value : initialBoard[i];
    this.setState({
      boardArr: changedBoard,
      editedList: editedList
    });
    console.log(
      "init",
      this.state.initialBoard,
      "board",
      this.state.boardArr,
      "solved",
      this.state.solvedSudoku
    );
  };

  lastSession = () => {
    let storage = JSON.parse(window.localStorage.getItem("state"));
    //console.log(storage);
    //console.log({ ...storage });
    this.setState({ ...storage });
  };

  componentDidMount() {
    let stateSerialized = JSON.stringify(this.state);
    window.localStorage.setItem("state", stateSerialized);
  }

  newGame = () => {
    let nextGame = sudoku.generate(this.state.level);
    let initialBoard = [...nextGame];
    let editedList = [];
    for (let index = 0; index < initialBoard.length; index++) {
      if (initialBoard[index] === ".") {
        editedList.push(index);
      }
    }
    this.setState({
      solvedSudoku: sudoku.solve([...nextGame]),
      initialBoard: [...nextGame],
      boardArr: [...nextGame]
    });
  };

  resetGame = () => {
    this.setState({
      boardArr: this.state.initialBoard
    });
  };

  solveGame = () => {
    let solved = [...this.state.solvedSudoku];
    //console.log([...this.state.solvedSudoku]);
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
    //console.log("state", this.state.boardArr, " ", this.state.initialBoard);
  };

  render() {
    return (
      <div className="App">
        {!this.state.playing ? (
          <StartingView level={this.assignDifficulty} last={this.lastSession} />
        ) : (
          <Wrapper>
            <Title />
            <Board
              boardArr={this.state.boardArr}
              onBoardChange={this.onBoardChange}
              highlightHandler={this.highlightHandler}
              highlight={this.state.highlight}
              clicked={this.state.clicked}
              editedList={this.state.editedList}
            />
            <Controls
              newGame={this.newGame}
              reset={this.resetGame}
              check={this.checkGame}
              solved={this.solveGame}
            />
          </Wrapper>
        )}
      </div>
    );
  }
}

export default App;
