import React, { Component } from "react";
import axios from "axios";
import Creatable from 'react-select/creatable'
import Ingredient from "./Ingredient";

class FermentableInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      fermentables: [],
      error: null,
      value: props.value,
      formError: {}
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    axios
      .get("/fermentables/")
      .then(result =>
        this.setState({
          fermentables: result.data,
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

  validateFermentable = () => {}

  render() {
    return (
      <div style={{ display: "flex", margin: "1rem 1rem" }}>
        <input
          type="number"
          style={{ width: "75px" }}
          placeholder="0.0lbs"
          onChange={e =>
            this.props.updateFermentable(
              e,
              "fermentables",
              this.props.index,
              "amount"
            )
          }
          value={this.props.amount}
          required
        />
        <Creatable options={this.state.fermentables} />
        <button
          type="button"
          onClick={e =>
            this.props.deleteFermentable(e, "fermentables", this.props.index)
          }
        >
        
          X
        </button>
      </div>
    );
  }
}

export default FermentableInput;
