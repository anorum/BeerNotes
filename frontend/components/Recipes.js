import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Recipe from "./Recipe"

const RecipeContainer = styled.div`
width: 100%;
margin: 10px auto;
`

const RecipeGrid = styled.div`
    display: grid;
    padding: 10px;
    grid-template-columns: 1fr 1fr;
    gap: 20px 20px;
    margin: 0 auto;

    @media screen and (max-width: ${props => props.theme.desktop}) {
        grid-template-columns: 1fr;
        padding: 0px;
    }
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