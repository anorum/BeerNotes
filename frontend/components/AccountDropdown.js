import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";
import UserContext from "./UserContext";
import { NotificationManager } from "react-notifications";

const AccountContainer = styled.div`
  position: relative;
  img {
    height: 20px;
    width: 20px;
    border-radius: 5px;
  }
`;
const AccountPic = styled.div`
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 5px;
  background: ${props => props.theme.statColor};
  color: white;
  font-size: 2rem;
  padding: 5px;
  text-align: center;
  &::after {
    content: "";
    border-bottom: 0 solid transparent;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top-style: solid;
    border-top-width: 4px;
    display: inline-block;
    position: absolute;
    height: 0;
    vertical-align: middle;
    right: -13px;
    top: 50%;
    width: 0;
  }
`;

const MenuContainer = styled.div`
  position: absolute;
  width: 200px;
  background: #fff;
  right: 0px;
  bottom: -335px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #dbdee1;

  a {
    display: block;
    cursor: pointer;
    padding: 4px;
    &:hover {
      background: #dbdee1;
    }
  }

  ::after {
    position: absolute;
    top: -7 px;
    z-index: 10;
    right: 5px;
    content: "";
    display: inline-block;
    border-color: #000;
    width: 0.5em;
    height: 0.5em;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #fff;
  }
`;

const DropdownDivider = styled.div`
  border-top: 1px solid #e1e4e8;
  display: block;
  height: 0;
  margin: 8px 0;
`;

const AccountDropdown = props => {
  const userContext = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  const user = userContext.user;
  const node = useRef();

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setShowMenu(false);
  };

  const logOut = e => {
    axios
      .post("/logout", {})
      .then(res => {
        NotificationManager.success("You have been logged out.", "Logged out");
        Router.replace("/");
      })
      .catch(err =>
        NotificationManager.error(`An error occurred: ${err.message}`)
      );
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <AccountContainer ref={node}>
        {user.profile_pic_link && user.profile_pic_link ? (
          <AccountPic
          onClick={() => setShowMenu(!showMenu)}
              style={{
                background: `url(${user.profile_pic_link})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                borderRadius: "5px"
              }}
            >
            </AccountPic>
        ) : (
      <AccountPic onClick={() => setShowMenu(!showMenu)}>
          {user && user.username && user.username.charAt(0).toUpperCase()}
          </AccountPic>
        )}
      {showMenu && (
        <MenuContainer>
          Signed in as <span style={{ fontWeight: 700 }}>{user.username}</span>
          <DropdownDivider />
          <Link href={`/profile/${user.username}`}>Your Profile</Link>
          <Link
            href={{
              pathname: `/profile/${user.username}`,
              query: { page: "recipes" }
            }}
          >
            <a>Your Recipes</a>
          </Link>
          <Link
            href={{
              pathname: `/profile/${user.username}`,
              query: { page: "hops" }
            }}
          >
            <a>Your Hops</a>
          </Link>
          <Link
            href={{
              pathname: `/profile/${user.username}`,
              query: { page: "fermentables" }
            }}
          >
            <a>Your Fermentables</a>
          </Link>
          <Link
            href={{
              pathname: `/profile/${user.username}`,
              query: { page: "yeasts" }
            }}
          >
            <a>Your Yeasts</a>
          </Link>
          <Link
            href={{
              pathname: `/profile/${user.username}`,
              query: { page: "brewhistory" }
            }}
          >
            <a>Your Brew History</a>
          </Link>
          <DropdownDivider />
          <Link href="/settings/">Account Settings</Link>
          <DropdownDivider />
          <Link style={{ cursor: "pointer" }}>
            <a onClick={logOut}>Log Out</a>
          </Link>
        </MenuContainer>
      )}
    </AccountContainer>
  );
};

export default AccountDropdown;
