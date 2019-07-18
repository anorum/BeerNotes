import styled from "styled-components";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import Nav from "./Nav";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background-color: #fedc00;
`;

const Logo = styled.h1`
  font-size: 2.4rem;
  font-family: "Racing Sans One", cursive;
`;

const Header = () => (
  <StyledHeader>
    <h1>
      <Logo>
        <Link href="/">
          <a>Brewcipes</a>
        </Link>
      </Logo>
    </h1>
    <Nav />
  </StyledHeader>
);

export default Header;
