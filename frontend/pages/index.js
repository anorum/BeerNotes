import React from "react";
import Jumbotron from "../components/Jumbotron";
import MyRecipes from "../components/MyRecipes";
import User from "../components/User"
import NotUser from "../components/NotUser"
import StyledButton from "../components/styles/StyledButton"

const Home = props => (
  <React.Fragment>
    <Jumbotron>
      <h1> Find or Share Great Beer!</h1>
      <h2> Create a Recipe Below if you want!</h2>
      <NotUser>
      <StyledButton href="/register" alt="register">Join Today!</StyledButton>
      </NotUser>
    </Jumbotron>
    <User>
      <MyRecipes />
    </User>
  </React.Fragment>
);

export default Home;
