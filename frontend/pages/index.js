import React from "react";
import Jumbotron from "../components/Jumbotron";
import MyRecipes from "../components/MyRecipes";

const Home = props => (
  <React.Fragment>
    <Jumbotron>
      <h1> Find or Share Great Beer!</h1>
      <h2> Create a Recipe Below if you want!</h2>
    </Jumbotron>
    <MyRecipes />
  </React.Fragment>
);

export default Home;
