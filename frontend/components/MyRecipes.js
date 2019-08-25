import React, { Component  } from "react";
import RecipeSideSlider from "./RecipesSideSlide"
import axios from 'axios'
import Jumbotron from "./Jumbotron"
import styled from "styled-components"


const HomeGrid = styled.div`
display: grid;
grid-template-columns: 65% 1fr;
grid-gap: 20px 20px;

`


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
    axios.get('/myrecipes/3')
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
      <HomeGrid>
      <div>
        <h2>Your Recent Recipe{this.state.recipes.length > 1 && 's'}</h2>
        {this.state.isLoading && <div> Loading...</div>}
        {this.state.error && <div> {this.state.errorMessage} </div> ||
        ( <React.Fragment>

          
          <RecipeSideSlider recipes={this.state.recipes} />

        </React.Fragment>
          )
        }
        </div>
        <div>
            <h2> Current Brews </h2>
          </div>
        </HomeGrid>

    )
      

  }
}
