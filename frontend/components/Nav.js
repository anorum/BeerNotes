import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";


const link_items = [
  { href: "/recipes", label: "Recipes" },
  { href: "/hops", label: "Hops" },
  { href: "/fermentables", label: "Fermentables" },
  { href: "/yeasts", label: "Yeast" }
];

const links = link_items.map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const StyledNav = styled.nav`
  display: flex;
  grid-area: mainnav;
  flex-direction: row;
  align-items: center;
  flex-grow: 2;
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
  @media only screen and (max-width: ${props => props.theme.mobile}) {
    justify-content: center;
  }

  @media only screen and (max-width: ${props => props.theme.tablet}) {
    font-size: 1.8rem;
    a {
      margin-left: 0;
    }
  }
`;

const Nav = () => {
  return (
    <StyledNav>
      {links.map(({ key, href, label }) => (
        <Link href={href} key={key}>
          {label}
        </Link>
      ))}
    </StyledNav>
  );
};

export default Nav;
