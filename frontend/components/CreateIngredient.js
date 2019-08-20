import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import srmToHex from "../data/srmToHex";
import {
  IngredientContainer,
  Format,
  CreateWrapper,
  NameContainer,
  DetailsContainer,
  Details,
  DetailHeader
} from "./styles/IngredientForm";
import HoverTip from "./HoverTip";

const color = {
  fermentables: value => srmToHex(value) || "#EEAF4B",
  hops: value => "#5ED37F",
  yeasts: value => "#FACA33"
};

const Container = styled.div`
  display: flex;
  padding: 0rem 1.5rem;
  transition: box-shadow 0.25s;
  border: 0.5px solid #f0f0f0;
  border-radius: 15px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;

const Name = styled.input`
  font-size: 2rem;
`;

class CreateIngredient extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.state = {
      name: this.props.name
    };
  }
  validate() {
    this.form.current.reportValidity();
  }

  componentDidMount() {
    Object.keys(this.props.fields).forEach(field => {
      if (typeof this.props.fields[field].type === "select") {
        this.setState({
          [field]: this.props.fields[field].options[0]
        });
      }
    });
  }

  getFieldNames(fields) {
    return Object.keys(fields).map(field =>
      field
        .replace("_", " ")
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.substring(1))
        .join(" ")
    );
  }

  handleChange = (e, validateFunction) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;

    this.setState({ [name]: val });
  };

  handleCreate = async e => {
    e.preventDefault();
    this.validate();

    await axios
      .post(`/${this.props.for}/create`, this.state)
      .then(result => this.props.handleCreate(true, result.data))
      .catch(err => {
        console.log(err.response.data);
        this.props.handleCreate(false, err);
      });
  };

  render() {
    const { fields } = this.props;
    return (
      <form onSubmit={this.handleCreate} ref={this.form}>
        <IngredientContainer>
          <Format
            style={{
              background: color[this.props.for](this.state.lovibond),
              color: this.state.lovibond >= 13 && "white"
            }}
          />
          <CreateWrapper>
            <NameContainer style={{ borderBottom: "0px" }}>
              <h4>
                <Name
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder={`Enter name of ${this.props.for}.`}
                  required
                />
              </h4>
            </NameContainer>
            <DetailsContainer style={{ justifyContent: "start" }}>
              {Object.keys(fields).map(field => (
                <DetailHeader>
                  <Details>
                    <HoverTip help={fields[field].help}>
                      <label htmlFor={field}>
                        {field
                          .replace("_", " ")
                          .split(" ")
                          .map(
                            word =>
                              word.charAt(0).toUpperCase() + word.substring(1)
                          )
                          .join(" ")}
                      </label>
                    </HoverTip>
                    {fields[field].type === "select" ? (
                      <select
                        name={field}
                        id={field}
                        value={this.state.field}
                        onChange={this.handleChange}
                      >
                        {fields[field].options.map(option => (
                          <option value={option} name={field}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={fields[field].type}
                        id={field}
                        placeholder={fields[field].placeholder}
                        {...(fields[field].type === "number" ? { min: 0 } : {})}
                        name={field}
                        value={this.state.field}
                        onChange={(e, v) => this.handleChange(e, "swag")}
                        required={fields[field].required}
                      />
                    )}
                  </Details>
                </DetailHeader>
              ))}
              <div
                style={{
                  display: "flex",
                  alignSelf: "flex-end",
                  marginLeft: "auto",
                  marginRight: "15px"
                }}
              >
                <input
                  type="submit"
                  value={`Create ${this.props.for.charAt(0).toUpperCase() +
                    this.props.for.substring(1, this.props.for.length - 1)}`}
                />
                <button
                  type="button"
                  onClick={() => this.props.handleCreate(false, this.state)}
                >
                  Cancel
                </button>
              </div>
            </DetailsContainer>
          </CreateWrapper>
        </IngredientContainer>
      </form>
    );
  }
}

export default CreateIngredient;
