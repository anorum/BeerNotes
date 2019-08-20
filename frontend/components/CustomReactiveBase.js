import React from 'react';
import { ReactiveBase } from "@appbaseio/reactivesearch"
import { withTheme } from "styled-components";

const CustomReactiveBase = (props) => {
    return (
        <ReactiveBase
        app="brewcipes"
        url="https://2zlp5s1cxj:zxpueqdn44@brewcipes-6393310412.us-west-2.bonsaisearch.net:443"
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