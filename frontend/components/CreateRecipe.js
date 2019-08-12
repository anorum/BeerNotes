import React, { Component } from "react";
import update from "immutability-helper";
import styled from "styled-components";
import Form from "./styles/Form";
import PropTypes from "prop-types";
import SectionContainer from "./styles/SectionContainer";
import Dropdown from "./Dropdown";
import FermentableInput from "./FermentableInput";

const Name = styled.input`
  border-bottom: 1px solid black;
  font-size: 2.5rem;
`;

const Description = styled.textarea`
  height: 80px;
`;

class CreateRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      private: true,
      icon: null,
      batch_size: 5,
      efficiency: 35,
      fermentables: [],
      grains: [],
      hops: [],
      yeasts: [],
      loading: false
    };
  }
  handleChange = e => {
    let { name, type, value } = e.target;
    if (!value) {
      value = e.target.dataset.value;
    }
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  addFermentable = e => {
    let newFermentables = this.state.fermentables.concat([{}]);
    this.setState({ fermentables: newFermentables });
  };

  updateIngredient = (e, ingredient, index, field) => {
    if (e.target) {
      var { value } = e.target;
    }
    else {
      var value = e
    }

    this.setState({
      [ingredient]: update(this.state.fermentables, {
        [index]: { [field]: { $set: value } }
      })
    });
  };

  deleteIngredient = (e, ingredient, index) => {
    let ingredients = [...this.state[ingredient]]
    if (index !== -1) {
      ingredients.splice(index, 1);
      this.setState({[ingredient]: ingredients})
    }
  }

  render() {
    return (
      <div>
        <h1>New Recipe</h1>
        <Form>
          <fieldset
            disabled={this.state.loading}
            aria-busy={this.state.loading}
          >
            <div style={{ display: "flex" }}>
              <Dropdown
                handleChange={this.handleChange}
                icon={this.state.icon}
              />
              <Name
                type="text"
                id="name"
                name="name"
                placeholder="Recipe Name"
                required
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
            <div style={{ height: "120px", width: "100%" }}>
              PlaceHolder for all the stats
            </div>
            <Description
              type="textarea"
              id="description"
              name="description"
              placeholder="Description"
              required
              value={this.state.description}
              onChange={this.handleChange}
            />
            <SectionContainer>
              <div>
                <img
                  id="logo"
                  src="../../static/IngredientLogos/grain.svg"
                  alt="grain"
                />
                <h2>Fermentables</h2>
                {this.state.fermentables.map((fermentable, index) => (
                  <FermentableInput
                    amount={fermentable.amount}
                    value = {fermentable.name}
                    index={index}
                    key={index}
                    updateFermentable={this.updateIngredient}
                    deleteFermentable={this.deleteIngredient}
                  />
                ))}
                <button type="button" onClick={this.addFermentable}>
                  Add Fermentable
                </button>
              </div>
            </SectionContainer>
            <SectionContainer>
              <div>
                <img
                  id="logo"
                  src="../../static/IngredientLogos/hop.svg"
                  alt="hops"
                />
                <h2>Hops</h2>
              </div>
            </SectionContainer>
            <SectionContainer>
              <div>
                <img
                  id="logo"
                  src="../../static/IngredientLogos/yeast.svg"
                  alt="yeast"
                />
                <h2>Yeasts</h2>
              </div>
            </SectionContainer>
          </fieldset>
        </Form>
      </div>
    );
  }
}

CreateRecipe.propTypes = {};

export default CreateRecipe;
