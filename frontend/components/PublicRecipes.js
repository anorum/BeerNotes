import React, { useEffect, useState } from 'react';
import axios from "axios"
import { ReactiveBase, SelectedFilters, SingleList } from "@appbaseio/reactivesearch"
import styled, { withTheme } from "styled-components";
import StyledDataSearch from "./styles/StyledDataSearch"


const PublicRecipes = (props) => {

    function customQuery() {
        return {
          "query": {
            "match": { "type": "recipe" }
          }
        }
      }

    return (
        <ReactiveBase
        app="brewcipes"
        credentials="ObcMd4kS2:86a06e1a-0d7e-4e8a-9b90-016530933be8"
        theme={{
          colors: {
            primaryColor: props.theme.black
          }
        }}
      >
      <SelectedFilters />
      <SingleList
        componentId="recipeFilter"
        dataField="type"
        title="Recipe"
        />
      <StyledDataSearch 
        componentId="recipeSearch" 
        dataField={["name"]} 
        innerClass={{
                title: "search-title",
                input: "search-input",
                list: "search-list",
                mic: "search-mic"
            }}
            customQuery = {customQuery}
            
             />
      </ReactiveBase>
    );
};

export default withTheme(PublicRecipes);