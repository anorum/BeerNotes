import React from "react";
import Jumbotron from "./Jumbotron";
import styled, { withTheme } from "styled-components";
import StyledButton from "./styles/StyledButton";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  align-self: center;
  margin: auto;
  padding: 20px;
`;

const Image = styled.img`
  align-self: center;
  margin: auto;
  width: 33.33%;
`;

const LandingNewUser = props => {
  return (
    <Jumbotron
      style={{
        background: `linear-gradient(${props.theme.mainColor}, #FFFFFF)`
      }}
    >
      <Container>
        <Content>
          <div> 
            <h1> Brewcipes - A Simple Approach at Beer Brewing </h1>
            <h2></h2>
            <h3>
              A simple alternative to beer brewing websites. Get the information
              you need to brew get started with homebrewing and nothing more.
            </h3>

            <StyledButton href="/register" alt="sign up">
              Sign Up
            </StyledButton>
          </div>
        </Content>
        <Image src="../static/BeerHandMan.png" />
      </Container>
    </Jumbotron>
  );
};

export default withTheme(LandingNewUser);
