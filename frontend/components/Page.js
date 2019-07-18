import React, { Component } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Head from "./Head";
import Header from "./Header";

const theme = {
  red: "#FF0000",
  black: "#393939",
  grey: "#3A3A3A",
  lightGrey: "#E1E1E1",
  offWhite: "#EDEDED",
  maxWidth: "1000px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)"
};

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        font-size: 10px;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        font-family: 'Roboto', sans-serif;
        line-height: 1.5;
    }
    a {
        text-decoration: none;
        color: ${theme.black};
    }
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <GlobalStyle />
          <Head title="Beer Notes" />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
