import React, { useState, useContext } from "react";
import Router from "next/router";
import styled from "styled-components";
import User from "./User";
import NotUser from "./NotUser";
import StyledButton from "./styles/StyledButton";
import SearchMenu from "./SearchMenu";
import axios from "axios";
import { NotificationManager } from "react-notifications";

const ProfileContainer = styled.div`
  display: flex;
  flex: auto;
  justify-content: flex-end;
  margin: 0 3rem !important;
`;

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
      <SearchMenu />
      <User>
        <StyledButton href="/account">Account</StyledButton>
        <span onClick={logOut}>Log Out</span>
      </User>
      <NotUser>
        <StyledButton href="/register" alt="sign up">
          Sign Up
        </StyledButton>
        <StyledButton href="/login" alt="login" clear>
          Login
        </StyledButton>
      </NotUser>
    </ProfileContainer>
  );
};
export default AccountMenu;
