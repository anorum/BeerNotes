import React from "react";
import { ReactiveBase } from "@appbaseio/reactivesearch";
import { withTheme } from "styled-components";

const CustomReactiveBase = props => {
  return (
    <ReactiveBase
      app="brewcipe"
      url="http://127.0.0.1:1050/elastic/"
      theme={{
        colors: {
          primaryColor: props.theme.black
        }
      }}
    >
      {props.children}
    </ReactiveBase>
  );
};

export default withTheme(CustomReactiveBase);
