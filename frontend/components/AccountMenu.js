import React, { useState, useContext } from "react";
import Router from "next/router";
import styled from "styled-components";
import User from "./User";
import NotUser from "./NotUser";
import StyledButton from "./styles/StyledButton";
import axios from "axios";
import { NotificationManager } from "react-notifications";

const ProfileContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 3rem !important;
  grid-area: account;
`;

const MenuContainer = styled.div`
display: flex;
justify-content: space-between;
`

const AccountMenu = props => {
  const [showDropdown, setDropdown] = useState(false);

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
    <ProfileContainer>
    <MenuContainer>     
      <User>
        <StyledButton href="/account">Account</StyledButton>
        <span onClick={logOut}>Log Out</span>
      </User>
      <NotUser>
        <div style={{display: "flex", width: "200px", justifyContent: "space-between"}}>
        <StyledButton href="/login" alt="sign up">
          Sign In
        </StyledButton>
        <StyledButton href="/signup" alt="login" clear>
          Sign Up
        </StyledButton>
        </div>
      </NotUser>
      </MenuContainer>
    </ProfileContainer>
  );
};
export default AccountMenu;
