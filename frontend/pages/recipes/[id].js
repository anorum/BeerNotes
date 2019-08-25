import React from "react";
import axios from "axios";
import SingleRecipe from "../../components/SingleRecipe"


class Recipe extends React.Component {
  static async getInitialProps({ req, query: { id } }) {
    const recipe = await axios
      .get(`/recipe/${id}`)
      .then(res => res.data)
      .catch(err => err.message);

      return { recipe }
  }

  render() {
    return (
        <SingleRecipe recipe={this.props.recipe} user={this.props.user} />
    );
  }
}

export default Recipe;
