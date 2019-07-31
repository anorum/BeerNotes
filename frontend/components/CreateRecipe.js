import React, { Component } from 'react';
import Form from "./styles/Form"
import PropTypes from 'prop-types';

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
                    <label htmlfor="name">
                    Recipe Name
                        <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Recipe Name"
                        required
                        value={this.state.name}
                        onChange={this.handleChange}
                        />
                    </label>
                    <label htmlfor="description">
                    Description
                        <textarea
                        type="textarea"
                        id="description"
                        name="description"
                        placeholder="Description"
                        required
                        value={this.state.description}
                        onChange={this.handleChange}
                        />
                    </label>
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