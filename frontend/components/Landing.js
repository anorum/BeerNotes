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

const Landing = props => {
  return (
    <Jumbotron
      style={{
        background: `linear-gradient(${props.theme.mainColor}, #FFFFFF)`
      }}
    >
      <Container>
        <Content>
          <div>
            <h2>Find or Share Great Beer</h2>
            <p>
              Join today to make great brews and share them with your fellow
              homebrewers!
            </p>

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

export default withTheme(Landing);
