import styled from "styled-components";
import { Component } from "react";

const JumbotronContainer = styled.div`
  padding: 4rem 2rem;
  margin-bottom: 2rem;
  background-color: ${props => props.theme.mainColor};
  min-width: 100vw;
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Jumbotron = props => (
  <JumbotronContainer>{props.children}</JumbotronContainer>
);

export default Jumbotron;
