import React, { useState, useRef } from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import Recipe from './Recipe';

const RecipeContainer = styled.div`
margin: 0 auto;
touch-action: pan-y;
position: relative;
width: 100%;

:hover {
    span {
        opacity: .8;
    }

}

`

const RecipeSlider = styled.div`
display: flex;
padding: 0 150px;
overflow-x: scroll;
padding: 10px;
scroll-snap-type: x mandatory;
scroll-behavior: smooth;
scroll-snap-align: start;
flex-wrap: nowrap;
transition: all .3s ease;
scroll-padding: 0px 60px;

::-webkit-scrollbar {
    display: none;
}

    article {
        margin: auto 1.5rem;
        scroll-snap-align: start;
        

    }
`
const SliderHandle = styled.span`
background: rgba(20,20,20,.2);
position: absolute;
cursor: pointer;
opacity: 0;
z-index: 20;
bottom: 0;
height: 100%;
width: 60px;
transition: all .3s ease;

&.left {
    left: 0;
}

&.right {
    right: 0
}




`


const RecipesSideSlide = props => {

    const [showLeft, setShowLeft] = useState(false)
    const [showRight, setShowRight] = useState(true)

    const myRecipeSlider = useRef(null)

    const slideRight = () => {
        myRecipeSlider.current.scrollLeft += (myRecipeSlider.current.offsetWidth - 100)
    }

    const slideLeft = () => {
        myRecipeSlider.current.scrollLeft -= (myRecipeSlider.current.offsetWidth + 100)
    }

    const isScrolled = () => {
        setShowLeft(myRecipeSlider.current.scrollLeft > 30)
        setShowRight(myRecipeSlider.current.scrollLeft  < (myRecipeSlider.current.scrollWidth - window.innerWidth))
    }


    return (
        
        <RecipeContainer>
        {showLeft && <SliderHandle className="left" onClick={slideLeft}> </SliderHandle>}
            <RecipeSlider ref={myRecipeSlider} onScroll={isScrolled}>
            { props.recipes.map(recipe => <Recipe recipe={recipe} key={recipe.id} />) }
            </RecipeSlider>
        {showRight  && <SliderHandle className="right" onClick={slideRight}> </SliderHandle>}
        </RecipeContainer>
    );
};

RecipesSideSlide.propTypes = {
    
};

export default RecipesSideSlide;