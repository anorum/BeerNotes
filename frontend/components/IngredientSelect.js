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
      width: "98%"
    };
  },
  container: (provided, state) => {
    return {
      ...provided,
      width: "100%",
      alignSelf: "center"
    };
  },
  valueContainer: (provided, state) => {
    return {
      ...provided
    };
  },
  control: (provided, state) => {
    return {
      ...provided,
      minHeight: "90px",
      boxShadow: 0,
      borderWidth: "0 0 0 0",
      borderColor: state.isFocused ? "#FEDC00" : provided.borderColor,
      "&:hover": {
        borderColor: state.isFocused ? "#FEDC00" : provided.borderColor
      }
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

  handleCreateDone = async (success, val) => {
    if (success) {
      this.setState({
        isLoading: false,
        showAdd: false,
        newValue: null,
        value: { ...val }
      });
      await this.props.onChange(val.id, this.props.selectField);
      await this.props.onChange(val, this.props.for.slice(0, -1));
    } else {
      this.setState({
        isLoading: false,
        showAdd: false,
        newValue: null,
        error: val
      });
    }
  };

  handleChange = async (val, { action }) => {
    if (action !== "clear") {
      await this.props.onChange(val.id, this.props.selectField);
      await this.props.onChange(val, this.props.for.slice(0, -1));
    } else {
      await this.props.onChange(null, this.props.selectField);
      await this.props.onChange(null, this.props.for.slice(0, -1));
    }
  };

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
          formatOptionLabel={option => (
            <Ingredient ingredient={option} for={this.props.for} />
          )}
          onChange={this.handleChange}
          onCreateOption={this.handleCreate}
          value={this.props.value}
          getNewOptionData={(inputValue, optionLabel) => ({
            id: inputValue,
            name: optionLabel,
            __isNew__: true
          })}
        />
        <input
          tabIndex={-1}
          autoComplete="off"
          style={{ opacity: 0, height: 0 }}
          value={this.props.value}
          required
        />
        {this.state.showAdd && (
          <FormContainer>
            {this.props.createForm(this.state.newValue, this.handleCreateDone)}
          </FormContainer>
        )}
        
      </React.Fragment>
    );
  }
}

export default IngredientSelect;
