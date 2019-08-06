import React, { useEffect, useState } from 'react';
import axios from "axios"
import { SelectedFilters, SingleList, ReactiveList, ReactiveComponent, RangeInput } from "@appbaseio/reactivesearch"
import styled, { withTheme } from "styled-components";
import StyledDataSearch from "./styles/StyledDataSearch"
import CustomReactiveBase from "./CustomReactiveBase"
import Filter from "./Filter"
import Fermentables from "./filters/Fermentables"
import Hops from "./filters/Hops"
import Grains from "./filters/Grains"
import Yeasts from "./filters/Yeasts"
import Recipe from "./Recipe"

const SearchContainer = styled.div`
display: grid;
`

const RecipeContainer = styled.div`
width: 95%;
margin: 0 auto;
`

const RecipeGrid = styled.div`

div:nth-child(2n) {
  display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px 20px;
    margin: 0 auto;
}

`

const PublicRecipes = (props) => {


    return (
    <CustomReactiveBase>
    <ReactiveComponent
              componentId="RecipeLimit"
              customQuery={props => ({
                query: {
                  term: {
                    "type": "recipe"
                  }
                }
              })}
            />
    <SearchContainer>
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
            "and": ["RecipeLimit"]
        }}
             />
        <Filter>
            <RangeInput componentId="ABV" 
            dataField="target_abv" 
            title="ABV" 
            react={["RecipeNameSearch"]} 
            range={{
              "start": 2,
              "end": 20
            }}
            
            rangeLabels={(min, max) => ({
						start: `${min}%`,
						end: `${max}%`,
					})}
            />
            <Fermentables react={["RecipeNameSearch"]} />
            <Hops react={["RecipeNameSearch"]} />
            <Grains react={["RecipeNameSearch"]} />
            <Yeasts react={["RecipeNameSearch"]} />
        </Filter>
        <RecipeContainer>
      <RecipeGrid>
    <ReactiveList
    componentId="RecipeResults" 
    react={
        {
            "and": ["RecipeNameSearch", "Fermentables", "RecipeLimit"]
            }
            }
    renderItem={(res) => (<Recipe recipe={res} key={res.id} />)}
    stream={true}
    />
    </RecipeGrid>
    </RecipeContainer>
    </SearchContainer>
      </CustomReactiveBase>
    );
};

export default withTheme(PublicRecipes);