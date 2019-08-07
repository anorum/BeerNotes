import React, { Component } from 'react';
import styled from 'styled-components'
import Form from "./styles/Form"
import PropTypes from 'prop-types';

const Name = styled.input`
border-bottom: 1px solid black;
font-size: 2.5rem;
`

const Description = styled.textarea`
height: 80px;
`

const Icon = styled.select`
width: 80px !important;
margin-right: 1.5rem;
height: 80px;
`

class CreateRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            private: true,
            batch_size: 5,
            efficiency: 35,
            fermentables: [],
            grains: [],
            hops: [],
            yeasts: [],
            loading: false

        }
    }
    handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
      };

    render() {
        return (
            <div>
                <h1>New Recipe</h1>
                <Form>
                
                <fieldset disabled={this.state.loading} aria-busy={this.state.loading}>
                <div style={{display: "flex"}}>
                    <Icon>
                        <option>Fancy</option>
                        <option> Mug </option>
                    </Icon>
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
                    <div style={{height: "120px", width: "100%"}}>PlaceHolder for all the stats</div>
                        <Description
                        type="textarea"
                        id="description"
                        name="description"
                        placeholder="Description"
                        required
                        value={this.state.description}
                        onChange={this.handleChange}
                        />
                    <label htmlfor="batch_size">
                    Batch Size
                        <input
                        type="number"
                        id="batch_size"
                        name="batch_size"
                        placeholder={this.state.batch_size}
                        required
                        value={this.state.batch_size}
                        onChange={this.handleChange}
                        />
                    </label>
                </fieldset>
                </Form>
            </div>
        );
    }
}

CreateRecipe.propTypes = {

};

export default CreateRecipe;