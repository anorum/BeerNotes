import React, { useContext, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
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
    content: "";
    display: inline-block;
    height: 0;
    vertical-align: middle;
    width: 0;
  }
`;

const MenuContainer = styled.div`
  position: absolute;
  width: 150px;
  background: #fff;
  right: 0px;
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

  return (
    <AccountContainer>
      <AccountPic onClick={() => setShowMenu(!showMenu)}>
        {user.profile_pic_link ? (
          <img src={user.profile_pic_link} alt="profile_pic" />
        ) : (
          user.username.charAt(0).toUpperCase()
        )}
      </AccountPic>
      {showMenu && (
        <MenuContainer>
          Signed In As <span style={{ fontWeight: 700 }}>{user.username}</span>
          <DropdownDivider />
          <span onClick={logOut}>Log Out</span>
        </MenuContainer>
      )}
    </AccountContainer>
  );
};

export default AccountDropdown;
