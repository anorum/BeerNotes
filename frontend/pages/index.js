import React from "react";
import MyRecentRecipes from "../components/MyRecentRecipes";
import User from "../components/User";
import NotUser from "../components/NotUser";
import LandingNewUser from "../components/LandingNewUser";
import Jumbotron from "../components/Jumbotron";
import StyledButton from "../components/styles/StyledButton";
import { HeaderSection } from "../components/styles/PageStyles";

const Home = props => (
  <React.Fragment>
    <NotUser>
      <LandingNewUser />
    </NotUser>
    <User>
      <Jumbotron>
        <HeaderSection style={{padding: "0 15px"}}>
          <span style={{ marginLeft: "20px" }}>
            <h1>My Homepage</h1>
          </span>
          <StyledButton href="/recipes/create">Add Recipe</StyledButton>
        </HeaderSection>
      </Jumbotron>
      <MyRecentRecipes />
    </User>
  </React.Fragment>
);

export default Home;
