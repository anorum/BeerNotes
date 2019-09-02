import React from 'react';
import styled from "styled-components"
import PropTypes from 'prop-types';
import FilterButton from "./styles/FilterButton"

const Container = styled.div`
  border-bottom: 2px solid #e3e3e3;
  margin-top: 10px;

  transition: all 0.6s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0s;


  .selected {
    display: flex;
    flex-direction: column;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-around;

`

const Label = styled.span`
  font-size: 1.5rem;
  cursor: pointer;
`;

const ProfileMenu = props => {
    return (
        <Container>
            <LabelContainer>
                <FilterButton aria-active={props.selected === "recipes"} onClick={() => props.handleClick("recipes")}>Recipes</FilterButton>
                <FilterButton aria-active={props.selected === "hops"} onClick={() => props.handleClick("hops")}>Hops</FilterButton>
                <FilterButton aria-active={props.selected === "fermentables"} onClick={() => props.handleClick("fermentables")}>Fermentables</FilterButton>
                <FilterButton aria-active={props.selected === "yeasts"} onClick={() => props.handleClick("yeasts")}>Yeasts</FilterButton>
                <FilterButton aria-active={props.selected === "brewhistory"} onClick={() => props.handleClick("brewhistory")}>Brew History</FilterButton>
            </LabelContainer>
        </Container>
    );
};

ProfileMenu.propTypes = {
    
};

export default ProfileMenu;