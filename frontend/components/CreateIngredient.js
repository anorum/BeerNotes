import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

const color = {
  fermentables: "#EEAF4B",
  hops: "#5ED37F",
  yeasts: "#FACA33"
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

const TabColor = styled.div`
  padding: 0.5rem 10rem 1rem 3rem;
  top: 0;
  right: 0;
  height: 100%;
  min-width: 20%;
  width: 80%;
  transform: skew(-30deg, 0deg) translateX(15%);

  > * {
    transform: skew(30deg, 0deg);
  }

  table {
    width: 100%;
    margin-top: 0.2rem;
    vertical-align: center;
    th {
      text-align: left;
      font-weight: 800;
      padding: 0 2rem;
    }
    td {
      padding: 0 0 0 1.2rem;
    }
  }
`;

class CreateIngredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name
    };
  }

  fieldNames = Object.keys(this.props.fields).map(field =>
    field
      .replace("_", " ")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.substring(1))
      .join(" ")
  );

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  handleCreate = async () => {
    await axios
      .post(`/${this.props.for}/create`, this.state)
      .then(result => this.props.handleCreate(true, result.data))
      .catch(err => this.props.handleCreate(false, err));
  };

  render() {
    return (
      <div>
        <Container>
          <div style={{width:"40%", alignSelf: "center"}}>
            <h4>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </h4>
          </div>
          <TabColor style={{ background: color[this.props.for] }}>
            <table>
              {this.fieldNames.map(field => (
                <th>{field}</th>
              ))}
              <tbody>
                <tr>
                  {Object.keys(this.props.fields).map(field => (
                    <td>
                      <input
                        type={this.props.fields[field]}
                        name={field}
                        value={this.state[field]}
                        onChange={this.handleChange}
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </TabColor>
        </Container>
        <div style={{ display: "inline-block" }}>
          <button type="button" onClick={this.handleCreate}>
            Create {this.props.for.charAt(0).toUpperCase() + this.props.for.substring(1, this.props.for.length - 1)}
          </button>
          <button
            type="button"
            onClick={() => this.props.handleCreate(false, this.state)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default CreateIngredient;
