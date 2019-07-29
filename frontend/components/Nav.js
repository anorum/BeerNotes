import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import RedirectSearch from "./RedirectSearch";
import SearchIcon from "./SearchIcon"
import AccountMenu from "./AccountMenu"

const link_items = [
  { href: "/search", label: "Search" },
  { href: "/recipes", label: "Recipes" },
  { href: "/hops", label: "Hops" },
  { href: "/fermentables", label: "Fermentables" },
  { href: "/yeast", label: "Yeast" }
];

const links = link_items.map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const StyledNav = styled.ul`
  display: flex;
  flex-direction: row;
  justify-self: end;
  font-size: 2rem;
  flex-wrap: nowrap;

  > * {
    margin: 1rem 3rem;
  }

  > a {
    position: relative;
    margin: 1rem 3rem;

    &::after {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      height: 4px;
      background: rgba(0, 0, 0, 0.1);
      content: "";
      opacity: 0;
      -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;
      -moz-transition: opacity 0.3s, -moz-transform 0.3s;
      transition: opacity 0.3s, transform 0.3s;
      -webkit-transform: translateY(10px);
      -moz-transform: translateY(10px);
      transform: translateY(10px);
    }

    &:hover::after,
    &:focus::after {
      opacity: 1;
      -webkit-transform: translateY(0px);
      -moz-transform: translateY(0px);
      transform: translateY(0px);
    }
  }
`;

const Nav = () => {
  const [showSearch, setSearch] = useState(false);
  return (
    <StyledNav>
      {links.map(({ key, href, label }) => (
        <Link href={href} key={key}>
          <a>{label}</a>
        </Link>
      ))}
      <AccountMenu />
      {showSearch && (
        <div onBlur={() => setSearch(!showSearch)} style={{ margin: "0 3rem" }}>
          <RedirectSearch />
        </div>
      )}
      {!showSearch && (
        <div
          tabIndex="0"
          role="button"
          style={{ cursor: "pointer" }}
          onFocus={() => setSearch(!showSearch)}
        >
          <SearchIcon />
        </div>
      )}
    </StyledNav>
  );
};

export default Nav;
