import React from "react";
import axios from "axios";
import SingleRecipe from "../../components/SingleRecipe";
import Error from "next/error";

class Recipe extends React.Component {
  static async getInitialProps({ req, query: { id } }) {
    const recipe = await axios
      .get(`/recipe/${id}`)
      .then(res => res.data)
      .catch(err => {
        return { ...err.response.data, status: err.response.status };
      });

    return { recipe };
  }

  render() {
    return this.props.recipe.status ? (
      <Error
        statusCode={this.props.recipe.status}
        title={this.props.recipe.message}
      />
    ) : (
      <SingleRecipe recipe={this.props.recipe} user={this.props.user} />
    );
  }
}

export default Recipe;
