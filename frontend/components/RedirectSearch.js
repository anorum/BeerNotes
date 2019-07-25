import React, { Component } from "react";
import styled, { withTheme } from "styled-components";
import Router from "next/router";
import {
  ReactiveBase,
  DataSearch,
  CategorySearch
} from "@appbaseio/reactivesearch";

const StyledDataSearch = styled(DataSearch)`
  width: 20vw;

  .search-input {
    border-radius: 10px;
    font-size: 1.5rem;
  }

  .search-list {
    font-size: 1.5rem;
    mark {
      font-weight: bold;
      background-color: ${props => props.theme.mainColor};
    }
  }
`;

class RedirectSearch extends Component {
  pushToRoute(value, cause, source) {
    Router.push({ pathname: `/${source.type}/${source._id}` });
  }

  render() {
    return (
      <ReactiveBase
        app="brewcipes"
        credentials="ObcMd4kS2:86a06e1a-0d7e-4e8a-9b90-016530933be8"
        theme={{
          colors: {
            primaryColor: this.props.theme.black
          }
        }}
      >
        <StyledDataSearch
          componentId="homeSearch"
          dataField={["name"]}
          placeholder="Search for recipes, hops, fermentables, or yeasts"
          innerClass={{
            title: "search-title",
            input: "search-input",
            list: "search-list",
            mic: "search-mic"
          }}
          onValueSelected={(value, cause, source) =>
            this.pushToRoute(value, cause, source)
          }
          parseSuggestion={suggestion => ({
            title: suggestion.source.name,
            description:
              suggestion.source.type.charAt(0).toUpperCase() +
              suggestion.source.type.slice(1),
            value: suggestion.source.name,
            source: suggestion.source // for onValueSelected to work with parseSuggestion
          })}
          customHighlight={props => ({
            highlight: {
              pre_tag: ["<span>"],
              post_tag: ["</span>"],
              fields: {
                name: {}
              }
            }
          })}
        />
      </ReactiveBase>
    );
  }
}

export default withTheme(RedirectSearch);
