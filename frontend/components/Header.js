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
  .bar {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    background-color: ${props => props.theme.mainColor};
    align-items: baseline;
  }
`;

const Logo = styled.h1`
  font-size: 2.4rem;
  font-family: "Racing Sans One", cursive;
  margin-left: 2rem;
  position: relative;

  a {
    padding: 0.5rem 1rem;
    text-decoration: none;

    &:hover {
      color: white;
    }
  }
`;

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a>Brewcipes</a>
        </Link>
      </Logo>
      <Nav />
    </div>
  </StyledHeader>
);

export default Header;
