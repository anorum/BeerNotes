import React, { Component  } from "react";
import Recipes from "./Recipes"
import RecipeSideSlider from "./RecipesSideSlide"
import axios from 'axios'
import Recipe from "./Recipe";
import Jumbotron from "./Jumbotron"


export default class MyRecipes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      error: false,
      errorMessage: '',
      isLoading: true
    }
  }

  componentDidMount() {
    axios.get('/myrecipes/1')
          .then(res => {
            this.setState({
              recipes: res.data,
              isLoading: false
            })
            })
          .catch(res => {
            this.setState({
              error: true,
              errorMessage: res.message,
              isLoading: false
            })
          })
          
  }

  render() {

    return (
      <div>
        <h2>Your Recipe{this.state.recipes.length > 1 && 's'}</h2>
        {this.state.isLoading && <div> Loading...</div>}
        {this.state.error && <div> {this.state.errorMessage} </div> ||
        ( <React.Fragment>
          <Jumbotron color="#FFF">
          <RecipeSideSlider recipes={this.state.recipes} />
          </Jumbotron>
          <Recipes recipes={this.state.recipes} />
          </React.Fragment>
          )
        }
      </div>

    )
      

  }
}
