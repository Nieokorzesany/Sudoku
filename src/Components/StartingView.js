import React from "react";
import Title from "./Title";
import Wrapper from "./Wrapper";

const StargtingView = props => {
  return (
    <Wrapper>
      <Title />
      <div className="level">
        <button onClick={event => props.level(event)} value="easy">
          Easy
        </button>
        <button onClick={event => props.level(event)} value="medium">
          Medium
        </button>
        <button onClick={event => props.level(event)} value="hard">
          Hard
        </button>
        <button onClick={event => props.level(event)} value="very-hard">
          Very Hard
        </button>
        <button onClick={event => props.level(event)} value="insane">
          Insane
        </button>
        <button onClick={event => props.level(event)} value="inhuman">
          Inhuman
        </button>
      </div>
    </Wrapper>
  );
};

export default StargtingView;
