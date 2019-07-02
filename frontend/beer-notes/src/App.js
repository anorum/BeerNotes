import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:1050/recipes/Urban Farmhouse")
      .then(results => {
        return results.json();
      })
      .then(data => {
        let recipes = data.map(recipe => {
          return (
            <div key={recipe.id}>
              <h1>{recipe.name}</h1>
              <h2> Grains:</h2>
              <div> {recipe.grains.map(grain => grain.grain.name)}</div>
              <div> {recipe.hops.map(hop => hop.hop.name)}</div>
            </div>
          );
        });
        this.setState({ recipes: recipes });
        console.log("state", this.state.recipes);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Beer Notes</header>
        <div>{this.state.recipes}</div>
      </div>
    );
  }
}

export default App;
