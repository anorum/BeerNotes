import React from "react";
import MyRecipes from "../components/MyRecipes";
import User from "../components/User";
import NotUser from "../components/NotUser"
import LandingNewUser from "../components/LandingNewUser";
import Jumbotron from "../components/Jumbotron"
import StyledButton from "../components/styles/StyledButton"

const Home = props => (
  <React.Fragment>
  <NotUser>
  <LandingNewUser />
  </NotUser>
    <User>
      <Jumbotron>
      <span style={{marginLeft: "20px"}}>
        <h1>My Homepage</h1>
        </span>
        <StyledButton href="/recipes/create">
          Add Recipe
        </StyledButton>
      </Jumbotron>
      <MyRecipes />
    </User>
  </React.Fragment>
);



export default Home;
