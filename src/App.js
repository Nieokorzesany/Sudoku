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
      row: [],
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
    console.log(this.state.boardArr);
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
    console.log(
      this.state.row.includes(this.state.clicked),
      this.state.clicked,
      this.state.row
    );
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

  highlight = (event, index) => {
    let x = Math.floor(this.state.clicked / 9);
    let row = [];
    for (let i = 0; i < 9; i++) {
      row.push(x * 9 + i);
    }
    this.setState({
      clicked: index,
      row: row
    });
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
              clicked={this.state.row}
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
