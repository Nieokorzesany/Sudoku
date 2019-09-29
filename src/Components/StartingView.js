import React from "react";
import Title from "./Title";
import Wrapper from "./Wrapper";

const StargtingView = props => {
  return (
    <Wrapper>
      <Title />
      <button value="easy">Easy</button>
      <button value="medium">Medium</button>
      <button value="hard">Hard</button>
      <button value="very-hard">Very Hard</button>
      <button value="insane">Insane</button>
      <button value="inhuman">Inhuman</button>
    </Wrapper>
  );
};

export default StargtingView;
