import React from "react";
import Jumbotron from "../components/Jumbotron";
import Landing from "../components/Landing";
import MyRecipes from "../components/MyRecipes";
import User from "../components/User";
import NotUser from "../components/NotUser";
import StyledButton from "../components/styles/StyledButton";

const Home = props => (
  <React.Fragment>
    <Landing />
    <User>
      <MyRecipes />
    </User>
  </React.Fragment>
);

export default Home;
