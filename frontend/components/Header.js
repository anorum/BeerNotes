import styled from "styled-components";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import Nav from "./Nav";
import AccountMenu from "./AccountMenu";
import SearchMenu from "./SearchMenu";

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
  @media only screen and (max-width: ${props => props.theme.desktop}) {
    height: 100%;
  }


  .bar {
    display: grid;
    grid-template-columns: 150px 1fr 250px auto 250px;
    grid-template-areas: "logo mainnav search searchicon account";
    align-items: center;
    height: 100%;
    padding: 0px 2%;
    background-color: ${props => props.theme.mainColor};
    transition: all 0.6s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0s;

    @media only screen and (max-width: ${props => props.theme.desktop}) {
      grid-template-columns: 150px 1fr 250px;
      grid-template-rows: 75px auto 1fr;
      grid-template-areas: "logo searchicon account" "search search search" "mainnav mainnav mainnav" ;
    }
  }
`;

const Logo = styled.h1`
  font-size: 2.4rem;
  font-family: "Racing Sans One", cursive;
  margin-left: 2rem;
  flex-shrink: 1;
  margin: 0px;
  grid-area: logo a {
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
      <SearchMenu />
      <AccountMenu />
    </div>
  </StyledHeader>
);

export default Header;
