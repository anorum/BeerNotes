import React, { Component } from "react";
import styled from "styled-components";
import Creatable from "react-select/creatable";
import Ingredient from "./Ingredient";

const FormContainer = styled.div`
  grid-row: 2;
  grid-column: 2;
  margin: 5px 0;
`;

const styles = {
  singleValue: (provided, state) => {
    return {
      ...provided,
      width: "100%"
    };
  },
  container: (provided, state) => {
    return {
      ...provided,
      width: "100%"
    };
  },
  valueContainer: (provided, state) => {
    return {
      ...provided,
      height: "90px"
    };
  },
  control: (provided, state) => {
    return {
      ...provided,
      height: "90px"
    };
  }
};

class IngredientSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: props.isLoading,
      error: null,
      value: props.value,
      newValue: null,
      error: null
    };
  }

  handleCreate = inputValue => {
    this.setState({ isLoading: true, showAdd: true, newValue: inputValue });
  };

  handleCreateDone = (success, val) => {
    success
      ? this.setState({
          isLoading: false,
          showAdd: false,
          newValue: null,
          value: { ...val }
        })
      : this.setState({
          isLoading: false,
          showAdd: false,
          newValue: null,
          error: val
        });
  };

  handleChange = (value, { action }) => {
    if (action !== "clear") {
      this.props.onChange(value.id);
    } else {
      this.props.onChange(null);
    }
  };

  renderForm() {
    return this.props.createForm(this.state.newValue, this.handleCreateDone);
  }

  render() {
    return (
      <React.Fragment>
        <Creatable
          styles={styles}
          isClearable
          isLoading={this.state.isLoading}
          isDisabled={this.state.isLoading}
          options={this.props.options}
          getOptionLabel={option => option.name}
          getOptionValue={option => option.id}
          formatOptionLabel={option => <Ingredient ingredient={option} />}
          onChange={this.handleChange}
          onCreateOption={this.handleCreate}
          value={this.state.value}
          getNewOptionData={(inputValue, optionLabel) => ({
            id: inputValue,
            name: optionLabel,
            brand: null,
            __isNew__: true
          })}
        />
        {this.state.showAdd && (
          <FormContainer>{this.renderForm()}</FormContainer>
        )}
      </React.Fragment>
    );
  }
}

export default IngredientSelect;
