import React from "react";
import Link from "next/link";

const link_items = [
  { href: "localhost:3000/search", label: "Search" },
  { href: "/recipes", label: "Recipe" },
  { href: "/hops", label: "Hops" },
  { href: "/fermentables", label: "Fermentables" },
  { href: "/yeast", label: "Yeast" }
];

const links = link_items.map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = () => (
  <nav>
    <ul>
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <Link href={href}>
            <a>{label}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;
