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
    position: sticky;
    top: -1px;
    z-index: 20;
    height: 73px;
    

  .bar {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0px 2%;
    background-color: ${props => props.theme.mainColor};
    transition: all 0.6s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0s;
  }
`;

const Logo = styled.h1`
  font-size: 2.4rem;
  font-family: "Racing Sans One", cursive;
  margin-left: 2rem;
  flex-shrink: 1;
  margin: 0px;

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
