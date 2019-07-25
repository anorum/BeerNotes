import React, { Component } from "react";
import Router from "next/router";
import {
  ReactiveBase,
  DataSearch,
  CategorySearch
} from "@appbaseio/reactivesearch";

export default class RedirectSearch extends Component {
  pushToRoute(value, cause, source) {
    Router.push({ pathname: `/${source.type}/${source.id}` });
  }

  render() {
    return (
      <ReactiveBase
        app="brewcipes"
        credentials="ObcMd4kS2:86a06e1a-0d7e-4e8a-9b90-016530933be8"
      >
        <DataSearch
          componentId="homeSearch"
          dataField={["name"]}
          placeholder="Search for recipes, hops, fermentables, or yeasts"
          categoryField="type"
          onValueSelected={(value, cause, source) =>
            this.pushToRoute(value, cause, source)
          }
        />
      </ReactiveBase>
    );
  }
}