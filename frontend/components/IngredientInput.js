import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import IngredientSelect from "./IngredientSelect";
import {
  Container,
  IngredientListContainer,
  InputsContainer,
  InputContainer,
  DeleteButtonContainer
} from "./styles/IngredientForm";

class IngredientInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      options: [],
      error: null,
      value: props.value,
      formError: {}
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    axios
      .get(`/${this.props.for}/`)
      .then(result =>
        this.setState({
          options: result.data,
          isLoading: false
        })
      )
      .catch(error =>
        this.setState({
          error,
          isLoading: false
        })
      );
  }

  render() {
    return (
      <React.Fragment>
          <Container>
            <InputsContainer>
              {React.Children.map(this.props.children, child => (
                <InputContainer>{child}</InputContainer>
              ))}
            </InputsContainer>
            <IngredientSelect
              for={this.props.for}
              selectField={this.props.selectField}
              options={this.state.options}
              onChange={this.props.updateFunction}
              createForm={this.props.createForm}
              value={this.props.value}
            />
            <DeleteButtonContainer>
              <button type="button" onClick={this.props.deleteFunction}>
                X
              </button>
            </DeleteButtonContainer>
          </Container>
      </React.Fragment>
    );
  }
}

export default IngredientInput;
