import React, { useState, useContext } from "react";
import styled from "styled-components";
import User from "./User"
import NotUser from "./NotUser"
import StyledButton from "./styles/StyledButton"
import SearchMenu from "./SearchMenu";


const ProfileContainer = styled.div`
  display: flex;
  flex: auto;
  justify-content: flex-end;
  margin: 0 3rem !important;
`;

const AccountMenu = props => {
  const [showDropdown, setDropdown] = useState(false);


  return (
    <ProfileContainer>
    <SearchMenu />
      <User>
        <StyledButton href="/account">
          Account
        </StyledButton>
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
