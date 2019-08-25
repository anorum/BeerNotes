import React from "react";
import styled from "styled-components";
import srmToHex from "../data/srmToHex";
import {
  IngredientContainer,
  Format,
  Wrapper,
  NameContainer,
  DetailsContainer,
  Details,
  DetailHeader
} from "./styles/IngredientForm";

const color = {
  fermentables: value => srmToHex(value) || "#EEAF4B",
  hops: value => "#5ED37F",
  yeasts: value => "#FACA33"
};

const Ingredient = props => {
  const { name, category, hop_type, yeast_format } = props.ingredient;
  const fieldNames = Object.keys(props.ingredient).filter(
    val =>
      !(
        val.includes("id") ||
        val.includes("name") ||
        val.includes("__isNew__") ||
        val.includes("category") ||
        val.includes("hop_type") ||
        val.includes("yeast_format")
      )
  );

  return (
    <IngredientContainer>
      <Format
        style={{
          background: color[props.for](props.ingredient.lovibond),
          color: props.ingredient.lovibond <= 13 && "#393939"
        }}
      >
        {category || hop_type || yeast_format}
      </Format>
      <Wrapper>
        <NameContainer><h4>{name}</h4></NameContainer>
        <DetailsContainer>
          {fieldNames.map(field => (
            <Details key={field}>
              <DetailHeader>
                {field
                  .replace("_", " ")
                  .split(" ")
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ")}
              </DetailHeader>
              <div>{props.ingredient[field]}</div>
            </Details>
          ))}
        </DetailsContainer>
      </Wrapper>
    </IngredientContainer>
  );
};

export default Ingredient;
