import React, { useState, useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import RedirectSearch from "./RedirectSearch";
import { UserContext} from "./UserProvider"


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
  const userContext = useContext(UserContext)
  return (
    <StyledNav>
      {links.map(({ key, href, label }) => (
        <Link href={href} key={key}>
          <a>{label}</a>
        </Link>
      ))}
      {
        userContext.user !== null ? (
          <Link href="/account">
            <a alt="Account">Account</a>
          </Link>
        ) : (<Link href="/login">
            <a alt="login">Login / Sign Up</a>
          </Link>)
      }
      {showSearch && (
        <div onBlur={() => setSearch(!showSearch)}>
          <RedirectSearch />
        </div>
      )}
      {!showSearch && (
        <div
          tabIndex="0"
          role="button"
          style={{ cursor: "pointer" }}
          onClick={() => setSearch(!showSearch)}
        >
          <svg
            alt="Search"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
          >
            <title>Search</title>
            <path
              d="
        M6.02945,10.20327a4.17382,4.17382,0,1,1,4.17382-4.17382A4.15609,4.15609,
        0,0,1,6.02945,10.20327Zm9.69195,4.2199L10.8989,9.59979A5.88021,5.88021,
        0,0,0,12.058,6.02856,6.00467,6.00467,0,1,0,9.59979,10.8989l4.82338,
        4.82338a.89729.89729,0,0,0,1.29912,0,.89749.89749,0,0,0-.00087-1.29909Z
      "
              fill="currentColor"
            />
          </svg>
        </div>
      )}

    </StyledNav>
  );
};

export default Nav;