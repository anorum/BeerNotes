import styled from "styled-components";
import { Component } from "react";

const JumbotronContainer = styled.div`
  padding: 4rem 2rem;
  margin-bottom: 2rem;
  background-color: ${props => props.theme.mainColor};
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Jumbotron = props => (
  <JumbotronContainer>{props.children}</JumbotronContainer>
);

export default Jumbotron;
