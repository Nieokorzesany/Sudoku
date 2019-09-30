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
      solvedSudoku: []
    };
  }

  onBoardChange = (event, i) => {
    let initialBoard = [...this.state.initialBoard];
    let changedBoard = this.state.boardArr;
    changedBoard[i] =
      changedBoard[i] === "." ? event.target.value : initialBoard[i];
    this.setState({
      boardArr: changedBoard
    });
  };

  componentDidUpdate() {
    window.localStorage.setItem("board", this.state.boardArr);
  }

  newGame = () => {
    let nextGame = [...sudoku.generate(this.state.level)];
    this.setState({ initialBoard: nextGame, boardArr: nextGame });
  };

  resetGame = () => {
    this.setState({
      boardArr: this.state.initialBoard
    });
  };

  solveGame = () => {
    this.setState({ boardArr: [...this.state.solveSudoku] });
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
      solveSudoku: sudoku.solve(board),
      playing: true,
      level: event.target.value,
      initialBoard: [...board],
      boardArr: [...board]
    });
  };

  row = index => {
    let x = Math.floor(index / 9);
    let row = [];
    for (let i = 0; i < 9; i++) {
      row.push(x * 9 + i);
    }
    let y = this.state.solveSudoku;
    let grid = sudoku.board_string_to_grid(y);
    let position = grid[[x]].indexOf([...y][index]);
    console.log("pos", position);
    let col = [];
    for (let i = 0; i < 9; i++) {
      col.push(i * 9 + position);
    }
    console.log("xol", [...row, ...col]);
    this.setState({
      highlight: [...row, ...col]
    });
  };

  highlight = (event, index) => {
    this.setState({
      clicked: index
    });
    this.row(index);
  };

  render() {
    return (
      <div className="App">
        {!this.state.playing ? (
          <StartingView level={this.assignDifficulty} />
        ) : (
          <Wrapper>
            <Title />
            <Board
              boardArr={this.state.boardArr}
              onBoardChange={this.onBoardChange}
              highlight={this.highlight}
              clicked={this.state.highlight}
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
