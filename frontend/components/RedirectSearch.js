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
    .trim span {
      font-size: 1.5rem;
      mark {
        background-color: ${props => props.theme.mainColor} !important;

      }
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
          highlight
          onValueSelected={(value, cause, source) =>
            this.pushToRoute(value, cause, source)
          }
          parseSuggestion={suggestion => ({
            title: suggestion.source.name,
            description:
              suggestion.source.type.charAt(0).toUpperCase() +
              suggestion.source.type.slice(1),
            value: suggestion.source.name,
            source: suggestion.source
          })}

          renderNoSuggestion={() => (
        <div className="search-list">
            No suggestions found
        </div>
    )
}

        />
      </ReactiveBase>
    );
  }
}

export default withTheme(RedirectSearch);
