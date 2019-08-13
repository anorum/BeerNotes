import React, { Component } from "react";
import styled from "styled-components";
import axios from 'axios'

const Container = styled.div`
  position: relative;
  padding: 0.5rem;
  transition: box-shadow 0.25s;
  border: 0.5px solid #f0f0f0;
  border-radius: 15px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  max-width: 500px;
  margin: 2rem;
`;

const TabColor = styled.div`
  position: absolute;
  background: #efb700;
  padding: 0.5rem 6rem 1rem 3rem;
  top: 0;
  right: 0;
  height: 100%;
  min-width: 20%;
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
    }
    td {
      padding: 0 0 0 1.2rem;
    }
  }
`;

class FermentableForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      brand: null
    };
  }

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  handleCreate = async () => {
      await axios.post('/fermentables/create', this.state)
                .then(result => this.props.handleCreate(true, result))
                .catch(err => this.props.handleCreate(false, err.response.data))
  }
  

  render() {
    return (
    <div>
      <Container>
        <h4>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </h4>
        <TabColor>
          <table>
            <th>Brand</th>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    name="brand"
                    value={this.state.brand}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </TabColor>
      </Container>
      <div style={{display: "inline-block"}}>
      <button
          type="button"
          onClick={this.handleCreate}
        >
          Create Fermentable
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

export default FermentableForm;