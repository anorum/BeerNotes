import React from 'react';
import styled from 'styled-components'
import Link from 'next/link'
import StyledButton from "./styles/StyledButton"

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
        
        <RecipeCard>
            <RecipeDetails>
                <span>{ style }</span>
                <StyledButton style={{zIndex: 20}} href={`/brew/${id}`}>Brew</StyledButton>
                <Link href={`/recipe/${id}`}>
                <RecipeName>
                    <h2>{name}</h2>
                    <p>{description}</p>
                </RecipeName>
                 </Link>
                <span style={{alignSelf: "end"}}>
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 297 297" style={{fill: "#D7D7D7", opacity: ".6"}}>
                    <path d="M257.702,55.307c0-26.403-21.48-47.884-47.882-47.884c-10.124,0-19.747,3.197-27.682,8.821
                        c-6.55-3.213-13.837-4.949-21.374-4.949c-2.486,0-4.972,0.194-7.426,0.575C143.551,4.289,131.377,0,118.808,0
                        c-12.459,0-24.269,3.994-34.149,11.55c-5.977,4.57-10.985,10.339-14.708,16.841c-17.785,5.888-30.652,22.672-30.652,42.406
                        c0,16.066,8.53,30.174,21.297,38.043c-4.778,15.742-7.683,33.24-7.683,46.84c0,25.083,9.994,47.785,28.142,63.925
                        c15.04,13.374,34.791,21.528,56.412,23.463v33.804h-28.984c-5.558,0-10.064,4.507-10.064,10.064c0,5.559,4.507,10.065,10.064,10.065
                        h78.1c5.558,0,10.064-4.506,10.064-10.065c0-5.558-4.507-10.064-10.064-10.064h-28.987v-33.804
                        c21.623-1.935,41.375-10.088,56.416-23.463c18.148-16.14,28.144-38.842,28.144-63.925c0-17.074-4.396-39.294-11.275-57.38
                        C246.75,90.493,257.702,74.158,257.702,55.307z M147.53,223.398c-40.61,0-70.736-25.216-74.157-60.88h148.319
                        C218.273,198.182,188.145,223.398,147.53,223.398z M211.253,103.35c4.719,11.755,8.295,26.172,9.875,39.04H73.927
                        c1.07-8.729,3.067-18.209,5.753-27.143c1.407,0.135,2.833,0.209,4.275,0.209c7.166,0,14.062-1.672,20.255-4.833
                        c4.746,1.273,9.66,1.929,14.598,1.929c9.398,0,18.495-2.316,26.595-6.671c4.9,1.634,10.064,2.473,15.362,2.473
                        c10.68,0,20.772-3.48,28.971-9.578c6.207,2.869,13.043,4.416,20.085,4.416c0.458,0,0.911-0.021,1.366-0.035
                        C211.211,103.221,211.227,103.286,211.253,103.35z M209.82,83.063c-9.524,0-17.923-4.798-22.925-12.105
                        c-4.328,10.153-14.396,17.269-26.131,17.269c-6.421,0-12.338-2.132-17.098-5.722c-6.478,6.144-15.225,9.921-24.859,9.921
                        c-6.292,0-12.205-1.614-17.36-4.442c-4.45,4.531-10.643,7.347-17.492,7.347c-13.55,0-24.529-10.983-24.529-24.532
                        c0-13.547,10.979-24.527,24.529-24.527c0.04,0,0.079,0.002,0.118,0.002c4.342-15.096,18.244-26.144,34.734-26.144
                        c11.828,0,22.329,5.684,28.925,14.466c3.902-2.021,8.333-3.172,13.032-3.172c9.875,0,18.569,5.045,23.659,12.691
                        c4.304-9.752,14.051-16.563,25.396-16.563c15.327,0,27.754,12.427,27.754,27.757C237.574,70.635,225.148,83.063,209.82,83.063z"/>
                    </svg>
                </span>

            </RecipeDetails>
        </RecipeCard>

    </div>
    );
};

export default Recipe;