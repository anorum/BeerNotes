import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Recipe from "./Recipe"

const RecipeContainer = styled.div`
width: 95%;
margin: 0 auto;
`

const RecipeGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px 20px;
    margin: 0 auto;
`

const Recipes = props => {

    return (
        <RecipeContainer>
        <RecipeGrid>
            { props.recipes.map(recipe => <Recipe recipe={recipe} key={recipe.id} />) }
        </RecipeGrid>
        </RecipeContainer>
    );
};

Recipes.propTypes = {
    recipes: PropTypes.array
};

export default Recipes;