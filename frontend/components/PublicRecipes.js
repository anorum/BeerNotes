import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  SelectedFilters,
  SingleList,
  ReactiveList,
  ReactiveComponent,
  RangeInput
} from "@appbaseio/reactivesearch";
import styled, { withTheme } from "styled-components";
import StyledDataSearch from "./styles/StyledDataSearch";
import CustomReactiveBase from "./CustomReactiveBase";
import Filter from "./Filter";
import Fermentables from "./filters/Fermentables";
import Hops from "./filters/Hops";
import Yeasts from "./filters/Yeasts";
import Recipe from "./Recipe";

const SearchContainer = styled.div`
  display: grid;
  grid: auto auto / auto 1fr;
  grid-template-areas: "search search" "filters results";
`;

const SearchBarArea = styled.div`
  grid-area: search;
`;

const FilterArea = styled.div`
  grid-area: filters;
`;

const ResultsArea = styled.div`
  grid-area: results;

  & > div > div:nth-child(2) {
    display: grid;
    grid: 1fr / 1fr 1fr;
    grid-gap: 20px;
  }
`;

const RecipeContainer = styled.div`
  width: 95%;
  margin: 0 auto;
`;

const PublicRecipes = props => {
  return (
    <CustomReactiveBase>
      <ReactiveComponent
        componentId="RecipeLimit"
        customQuery={props => ({
          query: {
            term: {
              type: "recipe"
            }
          }
        })}
      />
      <SearchContainer>
        <SearchBarArea>
          <StyledDataSearch
            componentId="RecipeNameSearch"
            filterLabel="Recipe Name"
            dataField={["name"]}
            innerClass={{
              title: "search-title",
              input: "search-input",
              list: "search-list",
              mic: "search-mic"
            }}
            react={{
              and: ["RecipeResults", "RecipeLimit"]
            }}
            stream={true}
          />
        </SearchBarArea>
        <FilterArea>
          <Filter>
            <RangeInput
              componentId="ABV"
              dataField="target_abv"
              label="ABV"
              react={["RecipeNameSearch", "Fermentables", "RecipeLimit", "Hops", "Yeasts", "ABV"]}
              range={{
                start: 2,
                end: 20
              }}
              rangeLabels={(min, max) => ({
                start: `${min}%`,
                end: `${max}%`
              })}
            />
            <Fermentables label="Fermentables" react={["RecipeNameSearch", "Fermentables", "RecipeLimit", "Hops", "Yeasts", "ABV"]}/>
            <Hops label="Hops" react={["RecipeNameSearch", "Fermentables", "RecipeLimit", "Hops", "Yeasts", "ABV"]} />
            <Yeasts label="Yeasts" react={["RecipeNameSearch", "Fermentables", "RecipeLimit", "Hops", "Yeasts", "ABV"]} />
          </Filter>
        </FilterArea>
        <RecipeContainer>
          <ResultsArea>
            <ReactiveList
              componentId="RecipeResults"
              react={{
                and: ["RecipeNameSearch", "Fermentables", "RecipeLimit", "Hops", "Yeasts", "ABV"]
              }}
              renderItem={res => <Recipe recipe={res} key={res.id} />}
              stream={true}
              infiniteScroll={true}
              size={15}
            />
          </ResultsArea>
        </RecipeContainer>
      </SearchContainer>
    </CustomReactiveBase>
  );
};

export default withTheme(PublicRecipes);
