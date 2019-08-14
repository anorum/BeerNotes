import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import IngredientSelect from "./IngredientSelect";
import {
  Container,
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

  handleChange = (newValue, actionMeta) => {
    let id;
    if (actionMeta.action === "clear") {
      id = null;
    } else {
      id = newValue.id;
    }

    this.props.updateFunction(id);
    this.setState({ value: newValue });
  };

  render() {
    return (
      <React.Fragment>
        <Container>
          <InputsContainer>
            
              {React.Children.map(this.props.children, (child) => (<InputContainer>{child}</InputContainer>))}

          </InputsContainer>
          <IngredientSelect
            for = {this.props.for}
            options={this.state.options}
            onChange={value =>
              this.props.updateFunction(value, this.props.selectField)
            }
            createForm={this.props.createForm}
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
