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
  display: grid;
`;

const Header = () => (
  <StyledHeader>
    <h1>
      <Link href="/">
        <a>Beer Notes</a>
      </Link>
    </h1>
    <Nav />
  </StyledHeader>
);

export default Header;
