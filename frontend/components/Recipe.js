import React from 'react';
import styled from 'styled-components'
import Link from 'next/link'

const RecipeCard = styled.article`
    box-shadow: ${props => props.theme.bs};
    max-width: 450px;
    min-width: 350px;
    border-radius: 15px;
    position: relative;
    padding: 1em;
    transition: all .3s ease 0s;
    background: linear-gradient(80deg, #ffffff 60%, #ffed4b 60%);
`

const RecipeDetails = styled.div`
    display: grid;
    min-height: 15.625em;
    z-index: 1;
    position: relative;
    grid-template-rows: auto 1fr;
    grid-template-columns: 4fr 2fr;
    gap: 0.625em 0.625em;
`

const RecipeName = styled.div`
    align-self: end;
    text-align: left;
`

const Recipe = (props) => {
    const { id, name, style, description } = props.recipe
    return (
    <div>
        <Link href={`/recipe/${id}`}>
        <a  alt={name}>
        <RecipeCard>
            <RecipeDetails>
                <span>{ style }</span>
                <span style={{textAlign: 'right'}}> Brew It! </span>
                <RecipeName>
                    <h2>{name}</h2>
                    <p>{description}</p>
                </RecipeName>
                <div> 
                 
                </div>
                <div style={{gridColumn: "1, 2"}}>
                    Test
                </div>
            </RecipeDetails>
            
        </RecipeCard>
        </a>
        </Link>
    </div>
    );
};

export default Recipe;