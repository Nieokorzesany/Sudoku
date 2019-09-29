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
      board: "",
      boardArr: []
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
    let solve = this.state.boardArr.join("");
    solve = sudoku.solve(solve);
    this.setState({ boardArr: [...solve] });
    console.log(this.state);
  };

  checkGame = () => {
    let check = this.state.boardArr.join("");
    sudoku.solve(check) === check
      ? alert("Well done u did it !")
      : alert("You're close but not close enough");
  };

  assignDifficulty = event => {
    let board = [...sudoku.generate(event.target.value)];
    this.setState({
      playing: true,
      level: event.target.value,
      initialBoard: board,
      boardArr: board
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
              board={this.state.board}
              onBoardChange={this.onBoardChange}
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
